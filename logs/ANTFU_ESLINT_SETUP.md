# @antfu/eslint-config 設定完成 🎉

## 已完成的設定

### 1. 套件安裝

- ✅ 安裝 `@antfu/eslint-config`
- ✅ 移除舊的 ESLint 配置套件
- ✅ 移除 Prettier（由 @antfu/eslint-config 整合）

### 2. 配置文件

- ✅ 建立 `eslint.config.js`（扁平化配置）
- ✅ 移除舊的 `.eslintrc.js`
- ✅ 更新 `package.json` 為 ES 模組
- ✅ 配置 VS Code 設定

### 3. 功能特色

- 🔧 **自動格式化**：整合 Prettier 功能
- 🎯 **TypeScript 支援**：完整的 TypeScript 規則
- 🖼️ **Vue 3 支援**：Vue 3 最佳實踐規則
- 📝 **多格式支援**：CSS、HTML、Markdown 格式化
- ⚡ **扁平化配置**：使用現代 ESLint 配置格式

## 可用的指令

```bash
# 檢查程式碼
npm run lint

# 自動修復問題
npm run lint:fix

# 格式化程式碼
npm run format
```

## 配置特點

### 啟用的功能

- Vue 3 支援
- TypeScript 支援
- 自動格式化（CSS、HTML、Markdown）
- 開發環境允許 console 語句
- 生產環境警告/錯誤 console 和 debugger

### 程式碼風格

- 使用單引號
- 不使用分號
- 2 空格縮排
- 多行 if 語句使用大括號

### 忽略的文件

- `dist/` 建構輸出
- `node_modules/` 相依套件
- `public/` 靜態資源
- `*.d.ts` 類型定義文件

## VS Code 整合

- 儲存時自動格式化
- ESLint 作為預設格式化工具
- 自動修復 ESLint 錯誤
- 扁平化配置支援

## 遷移完成

您的專案現在使用 Anthony Fu 的 ESLint 配置，享受一致的程式碼風格和自動格式化功能！🚀
