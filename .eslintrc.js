module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    sourceType: "module",
  },
  rules: {
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "comma-dangle": ["error", "only-multiline"],
  },
  plugins: ["html", "react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
};
