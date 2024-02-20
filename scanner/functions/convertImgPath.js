function convertImgPath(src, filename) {
  try {
    let href = decodeURIComponent(src)
    href = href.replace(/("|")/g, "")
      .replace(/\\/g, "/")
      .replace(/#/g, "%23")
    let protocol = url.parse(href).protocol
    if (protocol === "file:" && href.indexOf("file:///") !== 0) {
      return href.replace(/^file:\/\//, "file:///")
    } else if (protocol === "file:") {
      return href
    } else if (!protocol || path.isAbsolute(href)) {
      href = path.resolve(path.dirname(filename), href).replace(/\\/g, "/")
        .replace(/#/g, "%23")
      if (href.indexOf("//") === 0) {
        return "file:" + href
      } else if (href.indexOf("/") === 0) {
        return "file://" + href
      } else {
        return "file:///" + href
      }
    } else {
      return src
    }
  } catch (error) {
    showErrorMessage("convertImgPath()", error)
  }
}