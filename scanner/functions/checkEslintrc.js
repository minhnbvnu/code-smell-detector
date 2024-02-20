function checkEslintrc() {
  const eslintrcPath = path.join(process.cwd(), '.eslintrc.js');
  if (!fse.existsSync(eslintrcPath)) return true;
  // date
  const date = parseFirstLineDate(eslintrcPath);
  if (!date) return true;
  // date src
  const eslintrcPathSrc = path.join(__dirname, './format/.eslintrc.js');
  const dateSrc = parseFirstLineDate(eslintrcPathSrc);
  return date < dateSrc;
}