function testRefCreationForType (t, refType) {
  const CARD_IN_REFERENCES = '.sc-metadata-section.sm-references .sc-card'
  let { editor } = setupTestApp(t, { archiveId: 'blank' })
  let workflow = _openWorkflow(editor)
  let addRefBtn = workflow.find('.se-manual-add .sm-' + refType)
  addRefBtn.click()
  // check if new item added
  let cards = editor.findAll(CARD_IN_REFERENCES)
  let numberOfRefCards = cards.length
  t.equal(numberOfRefCards, 1, 'There should be one new card for the added reference')
  // TODO: make sure that the editor is displayed correctly
  t.end()
}