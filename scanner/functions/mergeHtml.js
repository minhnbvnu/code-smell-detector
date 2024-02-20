function mergeHtml(content, uri) {
  try {
    const mustache = require("mustache")
    const title = path.basename(uri.fsPath)
    const style = readStyles()
    const templatePath = path.join(__dirname, "template", "template.html")
    return mustache.render(readFile(templatePath), { title, style, content })
  } catch (error) {
    showErrorMessage("makeHtml()", error)
  }
}