function readPrompts () {
  const _path = process.cwd()
  let prompts = []
  if (fs.existsSync(`${_path}/plugins/chatgpt-plugin/prompts`)) {
    if (fs.existsSync(`${_path}/plugins/chatgpt-plugin/prompts`)) {
      const files = fs.readdirSync(`${_path}/plugins/chatgpt-plugin/prompts`)
      const txtFiles = files.filter(file => file.endsWith('.txt'))
      txtFiles.forEach(txtFile => {
        let name = _.trimEnd(txtFile, '.txt')
        const content = fs.readFileSync(`${_path}/plugins/chatgpt-plugin/prompts/${txtFile}`, 'utf8')
        prompts.push({
          name,
          content
        })
      })
    }
  }
  return prompts
}