function resetGtkStyles() {
  GTK_VERSIONS.forEach(version => {
    const filepath = userStylesPath(version)
    let style = getFileContents(filepath)

    style = style.replace(/\/\* UNITE ([\s\S]*?) UNITE \*\/\n/g, '')
    setFileContents(filepath, style)
  })
}