function findAllTestFiles(_inputDir, _dir, options) {
  const _isTestFile = isTestFile(options)

  const testFiles = []

  const recurse = async (inputDir, dir) => {
    const files = await readDir(dir)
    await Promise.all(
      files.map(file => {
        const fullPath = path.join(dir, file)

        return (async () => {
          const res = await _isTestFile(inputDir, fullPath)
          if (!res) {
            return
          }
          if (res === 'dir') {
            await recurse(inputDir, fullPath)
            return
          }
          let name = file.split('/')
          name = name[name.length - 1]
          name = name.replace('.js', '').replace('.test', '')
          testFiles.push({
            name,
            path: fullPath,
          })
        })()
      })
    )
  }

  return recurse(_inputDir, _dir).then(() => testFiles)
}