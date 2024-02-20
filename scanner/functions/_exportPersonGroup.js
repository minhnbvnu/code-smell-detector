function _exportPersonGroup ($$, doc, contribIds, personGroupType) {
  if (contribIds && contribIds.length > 0) {
    let el = $$('person-group').attr('person-group-type', personGroupType)
    contribIds.forEach(id => {
      let refContribNode = doc.get(id)
      el.append(
        _exportRefContrib($$, refContribNode)
      )
    })
    return el
  }
}