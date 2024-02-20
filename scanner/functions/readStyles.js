function readStyles() {
  try {
    const basePath = path.join(__dirname, "styles");
    const katexPath = path.resolve(__dirname, '..', "resource", 'vditor', 'dist', 'js', 'katex', 'katex.min.css');
    const files = ['arduino-light.css', 'markdown.css', 'markdown-pdf.css']
    return files.map(file => makeCss(path.join(basePath, file))).join("")
      + makeCss(katexPath)
  } catch (error) {
    showErrorMessage("readStyles()", error)
  }
}