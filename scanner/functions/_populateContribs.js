function _populateContribs (doc, jats, importer, contribsPath, contribEls, groupId) {
  for (let contribEl of contribEls) {
    if (contribEl.attr('contrib-type') === 'group') {
      // ATTENTION: groups are defined 'inplace'
      // the members of the group are appended to the list of persons
      let group = {
        id: contribEl.id,
        type: 'group',
        name: getText(contribEl, 'named-content[content-type=name]'),
        email: getText(contribEl, 'email'),
        affiliations: _getAffiliationIds(contribEl, true),
        equalContrib: contribEl.getAttribute('equal-contrib') === 'yes',
        corresp: contribEl.getAttribute('corresp') === 'yes',
        funders: _getAwardIds(contribEl)
      }
      documentHelpers.append(doc, ['metadata', 'groups'], doc.create(group).id)

      let memberEls = contribEl.findAll('contrib')
      _populateContribs(doc, jats, importer, contribsPath, memberEls, group.id)
    } else {
      let contrib = doc.create({
        id: contribEl.id,
        type: 'person',
        givenNames: getText(contribEl, 'given-names'),
        surname: getText(contribEl, 'surname'),
        email: getText(contribEl, 'email'),
        alias: getText(contribEl, 'string-name[content-type=alias]'),
        prefix: getText(contribEl, 'prefix'),
        suffix: getText(contribEl, 'suffix'),
        affiliations: _getAffiliationIds(contribEl),
        funders: _getAwardIds(contribEl),
        bio: _getBioContent(contribEl, importer),
        equalContrib: contribEl.getAttribute('equal-contrib') === 'yes',
        corresp: contribEl.getAttribute('corresp') === 'yes',
        deceased: contribEl.getAttribute('deceased') === 'yes',
        group: groupId
      })
      documentHelpers.append(doc, contribsPath, contrib.id)
    }
  }
}