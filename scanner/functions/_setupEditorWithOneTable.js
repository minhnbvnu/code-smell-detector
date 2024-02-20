function _setupEditorWithOneTable (t) {
  let table
  let { context, editorSession, doc } = setupTestArticleSession({
    seed: doc => {
      table = tableHelpers.createTableFromTabularData(doc, TABLE_DATA, 't')
      doc.find('body').append(table)
    }
  })
  return { context, editorSession, doc, table }
}