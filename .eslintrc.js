module.exports = {
  //   env: {
  //     browser: true,
  //     es2021: true,
  //   },
  //   overrides: [
  //     {
  //       env: {
  //         node: true,
  //       },
  //       files: [".eslintrc.{js,cjs}"],
  //       parserOptions: {
  //         sourceType: "script",
  //       },
  //     },
  //   ],
  //   parserOptions: {
  //     ecmaVersion: "latest",
  //     sourceType: "module",
  //   },
  rules: {
    complexity: ["error", { max: 15 }],
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
