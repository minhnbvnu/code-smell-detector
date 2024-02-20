function selectRange (editor, startPath, startOffset, endPath, endOffset) {
  if (isString(startPath)) {
    startPath = startPath.split('.')
  }
  if (isString(endPath)) {
    endPath = endPath.split('.')
  }
  let startProperty = _getTextPropertyForPath(editor, startPath)
  let endProperty = _getTextPropertyForPath(editor, endPath)
  if (startProperty.context.surface !== endProperty.context.surface) {
    throw new Error('Given paths are not in the same surface.')
  }
  let editorSession = editor.context.editorSession
  let surface = startProperty.context.surface
  editorSession.setSelection({
    type: 'container',
    startPath,
    startOffset,
    endPath,
    endOffset,
    surfaceId: surface.id,
    containerPath: surface.getContainerPath()
  })
}