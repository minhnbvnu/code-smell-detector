function _exportContribGroup (jats, doc, exporter, collectionPath, type) {
  // FIXME: this should not happen if we have general support for 'person-groups'
  // ATM, we only support authors, and editors.
  let $$ = jats.$$
  let contribs = doc.resolve(collectionPath)
  let contribGroupEl = $$('contrib-group').attr('content-type', type)
  let groupedContribs = _groupContribs(contribs)
  for (let [groupId, persons] of groupedContribs) {
    // append persons without a group first
    if (groupId === 'NOGROUP') {
      persons.forEach(person => {
        contribGroupEl.append(_exportPerson($$, exporter, person))
      })
    // persons within a group are nested into an extra <contrib> layer
    } else {
      let group = doc.get(groupId)
      contribGroupEl.append(_exportGroup($$, exporter, group, persons))
    }
  }
  if (contribGroupEl.getChildCount() > 0) {
    return contribGroupEl
  }
}