# Log — 個人生活紀錄視覺化儀表板

將個人的各項生活數據以豐富的圖表和列表呈現，涵蓋看電影、棒球觀賽與小米手環運動紀錄。

## 功能模組

### 🎬 看電影紀錄

記錄每次觀影的日期、電影名稱、花費、票數、國別、影廳、版本等，提供多維度分析：

- 資料列表與搜尋
- 月度觀影頻率長條圖
- GitHub 風格貢獻圖（D3.js）
- 時段熱圖（星期 × 小時矩陣）
- 影廳 / 播放版本 / 國別分佈圖
- 觀影趨勢折線圖與多刷排行
- 場次、票數、花費總計統計

### ⚾ 棒球觀賽紀錄

記錄每場比賽的對戰隊伍、比分、球場、座位、聯盟等：

- Leaflet 互動地圖（標記各球場位置，點擊展開紀錄）
- 球場次數長條圖
- 主場勝率 / 國際賽統計
- 支援篩選：全部 / 國際賽 / 中華職棒

### ~~🏃 小米手環紀錄~~ (已停止維護)

分為兩個子頁面：

- **Sport** — 運動紀錄（跑步、健走、騎乘、游泳等）的時數、熱量、貢獻圖、時間熱圖
- **Activity** — 每日活動紀錄（步數、距離、熱量）含折線圖與年度統計面板

所有模組皆支援**按年份切換**查看。

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Vue 3（Composition API / `<script setup>`） |
| 建構工具 | Vite 7 |
| 路由 | Vue Router 4（Hash 模式） |
| UI 元件 | Vant 4 |
| 圖表 | D3.js 7（貢獻圖、時間熱圖）、Chart.js 2（長條圖、圓餅圖、折線圖） |
| 地圖 | Leaflet |
| CSS | Tailwind CSS 3 + SCSS |
| 工具 | VueUse、Lodash、Day.js |
| 型別 | TypeScript 5.6 |
| Lint | @antfu/eslint-config |
| 分析 | vue-gtag（Google Analytics） |

## 開始使用

```bash
# 安裝相依套件
pnpm install

# 啟動開發伺服器
pnpm dev

# 建構生產版本
pnpm build

# 預覽建構結果
pnpm serve
```

## 專案結構

```
src/
├── views/           # 頁面元件（Home、Movie、Baseball、Mi、MiSport、MiActivity）
├── components/      # 可重用元件（圖表、紀錄卡片等）
│   └── Mi/          # 小米手環相關元件
├── router/          # Vue Router 設定
├── services/        # API 請求層
├── view-models/     # TypeScript 型別定義
├── utils/           # 工具函式
├── plugins/         # Day.js、vue-gtag 設定
└── assets/          # CSS / SCSS 樣式
```

## 部署

靜態站點部署至 **GitHub Pages**（`gh-pages` 分支），生產環境靜態資源透過 **jsDelivr CDN** 加速載入。
