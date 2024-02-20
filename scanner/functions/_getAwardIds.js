function _getAwardIds (el) {
  let xrefs = el.findAll('xref[ref-type=award]')
  let awardIds = xrefs.map(xref => xref.attr('rid'))
  return awardIds
}