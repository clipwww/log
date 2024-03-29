module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser'
  },
  rules: {
    "no-console": [
      process.env.NODE_ENV === "production" ? "warn" : "off",
      { allow: ["warn", "error"] }
    ],
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": ["off", { singleQuote: 1 }],
    "no-explicit-any": "off",
    "no-useless-escape": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "vue/multi-word-component-names": "off"
  }
};
