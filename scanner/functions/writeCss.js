function writeCss (style) {
  write(`dist/${style.name}.css`, style.css)

  if (style.original) {
    write(`dist/${style.name}.${style.original.ext}`, style.original.code)
  }

  if (style.map) {
    write(`dist/${style.name}.css.map`, style.map)
  }

  write(`dist/${style.name}.min.css`, new CleanCSS().minify(style.css).styles)
}