function processCss (style) {
  const componentName = path.basename(style.id, '.vue')
  return postcss([cssnext()])
    .process(style.code, {})
    .then(result => {
      return {
        name: componentName,
        css: result.css,
        map: result.map
      }
    })
}