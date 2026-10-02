# GameScope Final

ゲーム情報・レビュー比較サイトの完成版フロントエンドです。

## 主な機能

- 日本語・英語の両方でゲーム検索
- ゲーム名は `Monster Hunter Wilds（モンスターハンター ワイルズ）` の形式
- 制作会社は `CAPCOM（カプコン）` の形式
- 制作会社、発売年、制作国、対応ハード、正規価格、中古市場平均を表示
- ゲームジャンルを説明欄に表示
- Steam / Microsoft Store / PlayStation Store / Nintendo eShop / Apple App Store の評価欄
- Game8 / ファミ通などの専門サイト欄
- ユーザー規模（レビュー件数等）を接続可能な構造
- ドット絵風ゲームビジュアル
- 白基調のレスポンシブデザイン
- 最近のゲーム紹介
- ジャンル・発売年フィルター
- 検索候補表示
- Enterキー検索
- スマートフォン対応

## 重要：リアルタイムデータについて

この配布版は「外部サイトを無断スクレイピングしているように見せる」のではなく、UIとデータ構造を完成させています。

本番サーバーでリアルタイム情報を入れる場合は、各サービスの公式API・許諾されたデータ取得方法をバックエンドから利用してください。

推奨データ項目：
- rating
- review_count
- review_summary
- source
- fetched_at
- price
- used_market_average
- used_market_median
- source_url

中古価格は、対象店舗・商品状態・地域・取得時刻を揃えたうえで平均値または中央値を計算してください。

Game8・ファミ通などの第三者サイトについては、記事本文をコピーせず、利用規約に従ってタイトル・評価・URL・短い要約等を表示してください。

## 起動

`index.html` をブラウザで開くだけで動作します。

## 本番化の構成例

Browser
  ↓
GameScope API
  ├─ Game Database
  ├─ Steam Review API
  ├─ Microsoft Store data source
  ├─ PlayStation data source
  ├─ Nintendo data source
  ├─ Apple App Store data source
  ├─ Specialist-site metadata
  └─ Used-market price collector
  ↓
Normalized Game Data
  ↓
GameScope UI
