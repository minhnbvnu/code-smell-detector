async function waitForDeferredSuggestions (editorView, totalSuggestions) {
  await conditionPromise(
    () => editorView.querySelector('.autocomplete-plus autocomplete-suggestion-list .suggestion-list-scroller')
  )

  const scroller = editorView.querySelector('.autocomplete-plus autocomplete-suggestion-list .suggestion-list-scroller')
  scroller.scrollTo(0, 100)
  scroller.scrollTo(0, 0)

  await conditionPromise(
    () => editorView.querySelectorAll('.autocomplete-plus li').length === totalSuggestions
  )
}