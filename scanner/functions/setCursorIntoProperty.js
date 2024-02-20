function setCursorIntoProperty (property, pos) {
  const path = property.getPath()
  let editorSession = property.context.editorSession
  let surface = property.context.surface
  editorSession.setSelection({
    type: 'property',
    path,
    startOffset: pos,
    surfaceId: surface.id,
    containerPath: surface.getContainerPath()
  })
}