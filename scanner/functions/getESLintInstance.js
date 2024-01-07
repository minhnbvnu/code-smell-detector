function getESLintInstance(format) {
  return new ESLint({
    useEslintrc: false,
    overrideConfigFile:
      __dirname + `../../../scripts/rollup/validate/eslintrc.${format}.js`,
    ignore: false,
  });
}