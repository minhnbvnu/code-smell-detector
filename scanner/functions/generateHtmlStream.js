async function * generateHtmlStream ({ head, body, footer }) {
  yield head
  yield body
  yield footer()
}