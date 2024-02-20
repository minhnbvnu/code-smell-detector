function makeCss(filename) {
  try {
    let css = readFile(filename)
    if (css) {
      return "\n<style>\n" + css + "\n</style>\n"
    } else {
      return ""
    }
  } catch (error) {
    showErrorMessage("makeCss()", error)
  }
}