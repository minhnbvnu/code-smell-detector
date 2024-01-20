module.exports = {
  rules: {
    complexity: ["error", { max: 20 }],
    "max-nested-callbacks": ["error", {max: 5}],
    "max-depth": ["error", {max: 10}],
    "max-params": ["error", {max: 5}]
  },
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: false,
      presets: ["@babel/preset-env"],
    },
  },
};
