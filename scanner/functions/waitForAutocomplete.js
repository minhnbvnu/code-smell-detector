function waitForAutocomplete (editor) {
  const editorView = atom.views.getView(editor)

  return conditionPromise(
    () => editorView.querySelectorAll('.autocomplete-plus li').length > 0
  )
}