# Vite 7.0 遷移完成 🎉

## 主要變更

### 1. 套件版本更新

- **Vite**: `^4.1.1` → `^7.0.0`
- **@vitejs/plugin-vue**: `^4.0.0` → `^6.0.0`
- **Vue**: `^3.2.47` → `^3.5.0`
- **@vueuse/core**: `^9.12.0` → `^11.0.0`
- **TypeScript**: `~4.5.5` → `~5.6.0`

### 2. 配置更新

#### vite.config.ts

- 更新函式結構使用 `defineConfig`
- 加入 `build.target: 'baseline-widely-available'`（Vite 7.0 新預設值）

#### tsconfig.json

- 更新 `target`: `ESNext` → `ES2022`
- 更新 `moduleResolution`: `Node` → `Bundler`
- 更新 `lib`: `["ESNext", "DOM"]` → `["ES2022", "DOM"]`

### 3. 重要的 Vite 7.0 變更

#### 系統需求

- ✅ Node.js 20.19+ 或 22.12+（您的版本：v22.15.0）
- ❌ 不再支援 Node.js 18

#### 建構目標

- 預設 `build.target` 改為 `'baseline-widely-available'`
- 對應瀏覽器版本：Chrome 107+, Edge 107+, Firefox 104+, Safari 16.0+

#### 移除的功能

- 移除 `splitVendorChunkPlugin`（已棄用）
- 移除 Sass legacy API 支援
- 移除部分過時的 TypeScript 類型定義

## 測試結果

### ✅ 開發伺服器

```bash
npm run dev
# VITE v7.0.2 ready in 484 ms
# ➜ Local: http://localhost:5173/
```

### ✅ 生產建構

```bash
npm run build
# ✓ built in 2.14s
```

## 安裝說明

由於某些套件版本衝突，我們使用了 `--legacy-peer-deps` 選項：

```bash
npm install --legacy-peer-deps
```

## 後續建議

1. **測試應用程式**：請全面測試您的應用程式功能
2. **更新 CI/CD**：確保您的持續整合環境使用 Node.js 20.19+
3. **檢查插件相容性**：如果您使用其他 Vite 插件，請確認它們與 Vite 7.0 相容

## 參考文件

- [Vite 7.0 官方發布說明](https://vitejs.dev/blog/announcing-vite7.html)
- [Vite 7.0 遷移指南](https://vitejs.dev/guide/migration.html)

遷移完成！🚀 您的專案現在已經成功升級到 Vite 7.0！
