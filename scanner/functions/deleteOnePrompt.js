function deleteOnePrompt (name) {
  const _path = process.cwd()
  mkdirs(`${_path}/plugins/chatgpt-plugin/prompts`)
  let filePath = `${_path}/plugins/chatgpt-plugin/prompts/${name}.txt`
  fs.unlinkSync(filePath)
}