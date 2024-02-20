function _exportPerson ($$, exporter, node) {
  let el = $$('contrib').attr({
    'id': node.id,
    'contrib-type': 'person',
    'equal-contrib': node.equalContrib ? 'yes' : 'no',
    'corresp': node.corresp ? 'yes' : 'no',
    'deceased': node.deceased ? 'yes' : 'no'
  })
  el.append(
    $$('name').append(
      _createTextElement($$, node.surname, 'surname'),
      _createTextElement($$, node.givenNames, 'given-names'),
      _createTextElement($$, node.prefix, 'prefix'),
      _createTextElement($$, node.suffix, 'suffix')
    ),
    _createTextElement($$, node.email, 'email'),
    _createTextElement($$, node.alias, 'string-name', { 'content-type': 'alias' }),
    _createBioElement($$, exporter, node)
  )
  node.affiliations.forEach(affiliationId => {
    el.append(
      $$('xref').attr('ref-type', 'aff').attr('rid', affiliationId)
    )
  })
  node.funders.forEach(funderId => {
    el.append(
      $$('xref').attr('ref-type', 'award').attr('rid', funderId)
    )
  })
  return el
}