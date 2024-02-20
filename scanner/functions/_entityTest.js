function _entityTest (t, entityType, entityName, checkSelection) {
  entityName = entityName || entityType
  let { editor } = setupTestApp(t, { archiveId: 'blank' })
  let modalEditor = startEditMetadata(editor)

  const CARD_SELECTOR = `.sc-card.sm-${entityType}`
  const _hasCard = () => {
    let card = modalEditor.find(CARD_SELECTOR)
    return Boolean(card)
  }
  const _getModelId = () => {
    let card = modalEditor.find(CARD_SELECTOR)
    return card.getAttribute('data-id')
  }
  function _defaultCheckSelection (t, sel) {
    t.deepEqual({
      type: sel.type,
      nodeId: sel.getNodeId()
    }, {
      type: 'property',
      nodeId: _getModelId()
    }, 'a field in the new entity should be selected')
  }

  doesNotThrowInNodejs(t, () => {
    _insertEntity(modalEditor, entityName)
  })
  t.ok(_hasCard(), 'there should be a card for the new entity')

  // Note: checking the selection as good as we can. The selected field us derived from the node schema and settings
  // TODO: we could apply a specific configuration so that we know the field name
  let sel = getSelection(modalEditor)
  let selState = getSelectionState(modalEditor)
  let _checkSelection = checkSelection || _defaultCheckSelection
  _checkSelection(t, sel, selState)

  // in addition to the plain 'Add Entity' we also test removal + undo
  selectCard(modalEditor, _getModelId())
  _removeEntity(modalEditor, entityName)
  t.notOk(_hasCard(), 'card should have been removed')

  clickUndo(modalEditor)
  t.ok(_hasCard(), 'card should be back again')

  t.end()
}