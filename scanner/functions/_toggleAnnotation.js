function _toggleAnnotation (t, editor, spec) {
  doesNotThrowInNodejs(t, () => {
    let menu = openMenu(editor, spec.menu)
    menu.find(`.sc-tool.sm-${spec.tool}`).el.click()
  })
}