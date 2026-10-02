# GameScope

GameScopeを「静的なサンプルサイト」から「フロントエンド＋検索API」構成へ拡張した版です。

## できること
- 日本語・英語の検索
- 表記ゆれ・入力ミスに対する候補予測
- ローカル統合カタログによる高速候補表示
- Steamのサーバー側ライブ検索
- PlayStation Store / Nintendo Store / Microsoft Store / Game8 / ファミ通への公式検索導線
- 英語名＋日本語名、開発会社、発売年、対応機種などの表示
- ストア・専門サイトの評価表示枠
- 最近のおすすめ

## 重要：GitHub Pagesだけでは「6サイトの全タイトルをリアルタイム統合」はできません
Steamは公式ドキュメント上、公開アプリ一覧の取得手段がありますが、現行の大規模用途ではIStoreServiceのGetAppListが案内されています。APIキーを使うサービスはブラウザへ直接置かず、サーバー側で扱う必要があります。

一方、PlayStation Store、Nintendo Store、Microsoft Store、Game8、ファミ通は、それぞれの公開ページ・利用規約・提供方法を確認しながら接続する必要があります。本パッケージでは無断転載や規約回避を前提にせず、公式検索ページへの導線を用意しています。

したがって、この版を「全タイトル対応」と偽って固定HTMLに大量のコピーを詰め込むのではなく、検索APIを追加して段階的に公式データソースを接続できる構成にしています。

## 公開方法（推奨）
### Vercel
1. GitHubにこのフォルダをアップロード。
2. VercelでGitHubリポジトリをImport。
3. Framework PresetはOther。
4. Deploy。
5. 発行されたURLを開く。

`index.html` がトップページ、`/api/search?q=...` が検索APIです。

### GitHub Pages
フロント画面だけなら `index.html` は表示できます。ただし `/api/search` のサーバー処理はGitHub Pagesでは動きません。ライブ検索を使う場合はVercel等へデプロイしてください。

## 本番で追加するべきもの
- Steam公式APIのサーバー側認証・取得処理
- PlayStation Storeの許可されたデータ取得手段
- Nintendo Storeの許可されたデータ取得手段
- Microsoft Storeの許可されたデータ取得手段
- Game8 / ファミ通の許可されたAPI・フィード・リンク連携
- 正規化DB（ゲームID、シリーズ、機種、地域、発売日）
- 定期更新ジョブ
- キャッシュ（Redis等）
- 評価値の出典・取得日時
- 中古価格の取得元と更新日時
- 利用規約・各社商標への配慮

## ファイル構成
- `index.html` : フロントエンド
- `api/search.js` : 検索API
- `lib/sources.js` : データソースアダプター
- `data/catalog.json` : 初期ローカルカタログ
- `vercel.json` : APIルーティング
- `package.json` : Node/Vercel設定
