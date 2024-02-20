function applyNOP (editorSession) {
  editorSession.applyChange(new DocumentChange([new ObjectOperation({ type: 'NOP' })], {}, {}), {})
}