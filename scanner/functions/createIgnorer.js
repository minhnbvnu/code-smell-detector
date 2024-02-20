function createIgnorer (directory, filename = '.prettierignore') {
  const file = path.join(directory, filename)
  if (fs.existsSync(file)) {
    const text = fs.readFileSync(file, 'utf8')
    return ignore()
      .add(text)
      .createFilter()
  }

  return () => true
}