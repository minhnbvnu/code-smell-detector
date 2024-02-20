function ensureAllFieldsVisible (editor, cardId) {
  let control = editor.find(`.sc-card[data-id="${cardId}"] .se-control.sm-show-more-fields`)
  if (control) {
    control.click()
  }
}