// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  // 啟用格式化功能
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
  // 忽略建構輸出目錄
  ignores: [
    'dist',
    'node_modules',
    'public',
    '*.d.ts',
  ],
  // 自定義規則
  rules: {
    // 允許 console 語句在開發環境
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Vue 相關規則
    'vue/multi-word-component-names': 'off',
    'vue/no-v-html': 'off',
    // TypeScript 相關規則
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // 風格相關規則
    'style/semi': ['error', 'never'],
    'style/quotes': ['error', 'single'],
    'style/indent': ['error', 2],
    'curly': ['error', 'multi-line'],
    'node/prefer-global/process': 'off', // 允許在 Node.js 中使用 process
    'vue/max-attributes-per-line': ['warn', {
      singleline: 3,
      multiline: 1,
    }],
    'perfectionist/sort-imports': ['warn', {
      groups: [
        'type',
        ['builtin', 'external'],
        'internal-type',
        'internal',
        ['parent-type', 'sibling-type', 'index-type'],
        ['parent', 'sibling', 'index'],
        'object',
        'unknown',
      ],
    }],
    'prefer-exponentiation-operator': 'off',
    'brace-style': ['warn', '1tbs', { allowSingleLine: true }],
    'style/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
  },
})
