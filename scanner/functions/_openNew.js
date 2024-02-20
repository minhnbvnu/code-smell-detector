function _openNew (templateId) {
  templateId = templateId || 'article'
  const template = templates[templateId]
  _createEditorWindow(template, { isNew: true })
}