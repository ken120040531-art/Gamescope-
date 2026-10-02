export async function searchSteam(q){
  // Public Steam Store search endpoint. No API key is embedded in the browser.
  const url="https://store.steampowered.com/api/storesearch/?term="+encodeURIComponent(q)+"&l=japanese&cc=jp";
  const r=await fetch(url,{headers:{"User-Agent":"GameScope/1.0"}});
  if(!r.ok) throw new Error("Steam HTTP "+r.status);
  const j=await r.json();
  return (j.items||[]).slice(0,12).map(x=>({
    source:"Steam",name_en:x.name,name_ja:x.name,steam_appid:x.id,
    price:x.price?.final_formatted||x.price?.initial_formatted||null,
    image:x.tiny_image||null,
    url:"https://store.steampowered.com/app/"+x.id+"/"
  }));
}
export function makeSourceLinks(q){
  const e=encodeURIComponent(q);
  return [
    {source:"Steam",url:"https://store.steampowered.com/search/?term="+e},
    {source:"PlayStation Store",url:"https://store.playstation.com/ja-jp/search/"+e},
    {source:"Nintendo Store",url:"https://www.nintendo.com/jp/search/?q="+e},
    {source:"Microsoft Store",url:"https://www.microsoft.com/ja-jp/search?q="+e},
    {source:"Game8",url:"https://game8.jp/search?q="+e},
    {source:"ファミ通",url:"https://www.famitsu.com/search?q="+e}
  ];
}