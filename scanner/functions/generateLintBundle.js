function generateLintBundle(lints) {
  const lintTests = Object.keys(lints).sort().map((fileName) => {
    return lints[fileName].lint;
  }).join('\n');

  return `import assert from 'assert';
suite('lint-tests', function() {
${lintTests}
});`;
}