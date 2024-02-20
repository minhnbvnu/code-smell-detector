function compareTextFiles(file1Path, file2Path) {
  const file1Content = fs.readFileSync(file1Path, 'utf-8')
  const file2Content = fs.readFileSync(file2Path, 'utf-8')
  return file1Content === file2Content
}