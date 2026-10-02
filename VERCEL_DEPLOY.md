# GameScope — Vercel公開手順

このフォルダはVercelにそのままデプロイできる構成です。

## 方法A：GitHubからVercelへ公開（おすすめ）

1. GitHubで新しいリポジトリを作成
   - 例：`gamescope`
2. このフォルダの中身を、GitHubリポジトリの一番上（root）にアップロード
3. Vercelへログイン
4. `Add New...` → `Project`
5. GitHubの `gamescope` リポジトリを選択
6. Framework Presetは `Other`
7. Build Commandは空欄
8. Output Directoryは空欄
9. `Deploy`

デプロイが終わると、Vercelが
`https://xxxx.vercel.app`
のようなURLを発行します。

そのURLを開けばGameScopeが表示されます。

## 方法B：Vercel CLI

Node.jsが入っているPCなら、プロジェクトフォルダで以下を実行できます。

```bash
npm install -g vercel
vercel
```

質問に答えて公開します。

本番公開は、

```bash
vercel --prod
```

です。

## API確認

公開後、

`https://あなたのドメイン.vercel.app/api/search?q=Monster%20Hunter`

を開くと検索APIのJSONが返ります。

## 注意

この版は「Vercel上で動く検索基盤」を作ったものです。

Steamはサーバー側からライブ検索する構成になっています。
PlayStation Store、Nintendo Store、Microsoft Store、Game8、ファミ通については、各サービスの公開方法・利用条件を確認した上で、許可されたAPI・フィード等を接続してください。

そのため、現段階で「6サイトの全タイトルを無断で取得している」とはしていません。

## 次の本番強化

- 各サービスの許可されたデータ取得コネクタ
- ゲームID統合
- 日本語・英語・別表記の正規化
- タイトル重複排除
- 価格・評価・レビュー件数の取得日時
- 中古価格のデータソース
- Vercel Cronによる定期更新
- データベース（Postgres等）
- キャッシュ
