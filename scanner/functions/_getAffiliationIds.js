function _getAffiliationIds (el, isGroup) {
  // let dom = el.ownerDocument
  let xrefs = el.findAll('xref[ref-type=aff]')
  // NOTE: for groups we need to extract only affiliations of group, without members
  if (isGroup) {
    xrefs = el.findAll('collab > xref[ref-type=aff]')
  }
  let affs = xrefs.map(xref => xref.attr('rid'))
  return affs
}