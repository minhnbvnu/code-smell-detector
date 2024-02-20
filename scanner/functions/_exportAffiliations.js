function _exportAffiliations (jats, doc) {
  let $$ = jats.$$
  let affiliations = doc.resolve(['metadata', 'affiliations'])
  let orgEls = affiliations.map(node => {
    let el = $$('aff').attr('id', node.id)
    el.append(_createTextElement($$, node.institution, 'institution', { 'content-type': 'orgname' }))
    el.append(_createTextElement($$, node.division1, 'institution', { 'content-type': 'orgdiv1' }))
    el.append(_createTextElement($$, node.division2, 'institution', { 'content-type': 'orgdiv2' }))
    el.append(_createTextElement($$, node.division3, 'institution', { 'content-type': 'orgdiv3' }))
    el.append(_createTextElement($$, node.street, 'addr-line', { 'content-type': 'street-address' }))
    el.append(_createTextElement($$, node.addressComplements, 'addr-line', { 'content-type': 'complements' }))
    el.append(_createTextElement($$, node.city, 'city'))
    el.append(_createTextElement($$, node.state, 'state'))
    el.append(_createTextElement($$, node.postalCode, 'postal-code'))
    el.append(_createTextElement($$, node.country, 'country'))
    el.append(_createTextElement($$, node.phone, 'phone'))
    el.append(_createTextElement($$, node.fax, 'fax'))
    el.append(_createTextElement($$, node.email, 'email'))
    el.append(_createTextElement($$, node.uri, 'uri', { 'content-type': 'link' }))
    return el
  })
  return orgEls
}