async function convertMarkdown(inputMarkdownFile, config) {

  const type = config.type
  const uri = URI.file(inputMarkdownFile)
  const text = fs.readFileSync(inputMarkdownFile).toString()
  const content = convertMarkdownToHtml(inputMarkdownFile, type, text, config)
  const html = mergeHtml(content, uri)
  await exportByType(inputMarkdownFile, html, type, config)

}