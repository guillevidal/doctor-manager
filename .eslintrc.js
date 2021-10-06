const RULES = {
  OFF: "off",
  WARN: "warn",
  ERROR: "error",
}
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  // TO - DO Sacar el OFF de estas reglas y fixear los archivos correspondientes
  rules: {
    "react/prop-types": RULES.OFF,
    "react/react-in-jsx-scope": RULES.OFF,
    camelcase: RULES.OFF,
    "node/handle-callback-err": RULES.OFF,
    "no-console": "error",
    "no-undef": RULES.OFF,
    "no-unused-vars": RULES.OFF,
    "no-useless-escape": RULES.OFF,
    "no-var": RULES.OFF,
  },
}
