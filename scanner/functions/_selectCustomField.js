function _selectCustomField (el, pos) {
  pos = pos || 0
  const customFieldEl = el.findAll(metadataFieldSelector)[pos]
  const surfaceEl = customFieldEl.find('.sc-surface')
  const surfaceId = surfaceEl.getSurfaceId()
  const path = surfaceEl.getPath()
  let editorSession = getEditorSession(el)
  editorSession.setSelection({
    type: 'property',
    path,
    surfaceId,
    startOffset: 0
  })
}