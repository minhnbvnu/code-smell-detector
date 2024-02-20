function _selectAbstractType (editor, customAbstractId, abstractType) {
  const abstractTypeEditor = editor.find(`.sc-card[data-id="${customAbstractId}"] .sc-form-row.sm-abstractType .sc-dropdown-editor`)
  // HACK: the easiest way to achieve this is using the DropdownEditor hooks directly
  abstractTypeEditor.refs.input.setValue(abstractType)
  abstractTypeEditor._setValue()
}