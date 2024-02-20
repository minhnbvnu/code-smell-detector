function readFile(filename, encode = "utf-8") {
  if (filename.indexOf("file://") === 0) {
    if (process.platform === "win32") {
      filename = filename.replace(/^file:\/\/\//, "")
        .replace(/^file:\/\//, "")
    } else {
      filename = filename.replace(/^file:\/\//, "")
    }
  }
  if (isExistsPath(filename)) {
    return fs.readFileSync(filename, encode)
  } else {
    return ""
  }
}