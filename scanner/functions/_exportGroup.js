function _exportGroup ($$, exporter, node, groupMembers) {
  /*
    <contrib id="${node.id}" contrib-type="group" equal-contrib="yes|no" corresp="yes|no">
      <collab>
        <named-content content-type="name">${node.name}</named-content>
        <email>${node.email}</email>
        <$ for (let affId of node.affiliations) {$>
          <xref ref-type="aff" rid=${affId} />
        <$ } $>
        <$ for (let awardId of node.awards) {$>
          <xref ref-type="award" rid=${awardId} />
        <$ } $>
        <contrib-group contrib-type="group-member">
          <$ for (let person of groupMembers) {$>
            <Person node=${person} />
          <$ } $>
        </contrib-group>
        </collab>
    </contrib>
  */
  let contribEl = $$('contrib').attr({
    'id': node.id,
    'contrib-type': 'group',
    'equal-contrib': node.equalContrib ? 'yes' : 'no',
    'corresp': node.corresp ? 'yes' : 'no'
  })
  let collab = $$('collab')
  collab.append(
    $$('named-content').attr('content-type', 'name').append(node.name),
    $$('email').append(node.email)
  )
  // Adds affiliations to group
  node.affiliations.forEach(affiliationId => {
    collab.append(
      $$('xref').attr('ref-type', 'aff').attr('rid', affiliationId)
    )
  })
  // Add funders to group
  node.funders.forEach(funderId => {
    collab.append(
      $$('xref').attr('ref-type', 'award').attr('rid', funderId)
    )
  })
  // Add group members
  // <contrib-group contrib-type="group-member">
  let contribGroup = $$('contrib-group').attr('contrib-type', 'group-member')
  groupMembers.forEach(person => {
    let contribEl = _exportPerson($$, exporter, person)
    contribGroup.append(contribEl)
  })
  collab.append(contribGroup)
  contribEl.append(collab)
  return contribEl
}