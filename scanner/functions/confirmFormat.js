function confirmFormat() {
  // check if in project path (not lerna/module)
  if (!fse.existsSync(path.join(process.cwd(), 'src/module'))) return;
  if (fse.existsSync(path.join(process.cwd(), 'packages/cabloy'))) return;
  // check .eslintrc.js
  if (!checkEslintrc()) return;
  // copy
  const files = [
    '.eslintrc.js', //
    '.eslintignore',
    '.prettierrc',
    '.prettierignore',
    ['_jsconfig.json', 'jsconfig.json'],
  ];
  for (const file of files) {
    let fileSrc;
    let fileDest;
    if (Array.isArray(file)) {
      fileSrc = file[0];
      fileDest = file[1];
    } else {
      fileSrc = file;
      fileDest = file;
    }
    fileSrc = path.join(__dirname, `./format/${fileSrc}`);
    fileDest = path.join(process.cwd(), fileDest);
    fse.copySync(fileSrc, fileDest);
  }
  console.log('eslint updated!!!\n');
}