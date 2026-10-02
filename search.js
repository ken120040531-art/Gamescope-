// Vercel Serverless Function
// Search adapter: Steam live search + local normalized catalog.
// Other sources are returned as official search links because their public APIs
// and redistribution terms differ. Add approved connectors in lib/sources.js.
import { searchSteam, makeSourceLinks } from "../lib/sources.js";
import catalog from "../data/catalog.json" with { type: "json" };

function norm(s=""){return s.toLowerCase().normalize("NFKC").replace(/[\s\-_・:：'’"“”.,!?！？]/g,"")}
function lev(a,b){a=norm(a);b=norm(b);if(a===b)return 0;if(!a||!b)return 99;const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return d[a.length][b.length]}
function localSearch(q){return catalog.map(g=>{const vals=[g.name_en,g.name_ja,g.developer_en,g.developer_ja].filter(Boolean);const d=Math.min(...vals.map(v=>lev(q,v)));return {...g,matchScore:Math.max(0,100-Math.round(d/Math.max(norm(q).length,1)*100))}}).sort((a,b)=>b.matchScore-a.matchScore).slice(0,8)}
export default async function handler(req,res){
 const q=String(req.query.q||"").trim();
 if(!q)return res.status(400).json({error:"q is required"});
 const local=localSearch(q);
 let steam=[];
 try{steam=await searchSteam(q)}catch(e){console.error("steam",e.message)}
 const merged=[...local,...steam].reduce((m,x)=>{const k=norm(x.name_en||x.name||"");if(k&&!m.has(k))m.set(k,x);return m},new Map());
 const results=[...merged.values()].slice(0,20);
 res.setHeader("Cache-Control","s-maxage=300, stale-while-revalidate=86400");
 return res.status(200).json({query:q,results,sources:makeSourceLinks(q),live:{steam:steam.length>0},note:"Steam is live when available. Other source connectors require approved access/terms and are represented by official search links in this build."});
}