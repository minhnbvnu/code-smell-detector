function saveOnePrompt (name, content) {
  const _path = process.cwd()
  mkdirs(`${_path}/plugins/chatgpt-plugin/prompts`)
  let filePath = `${_path}/plugins/chatgpt-plugin/prompts/${name}.txt`
  fs.writeFileSync(filePath, content)
}