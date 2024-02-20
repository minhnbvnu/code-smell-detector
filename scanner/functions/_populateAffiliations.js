function _populateAffiliations (doc, jats) {
  const affEls = jats.findAll('article > front > article-meta > aff')
  let orgIds = affEls.map(el => {
    let org = {
      id: el.id,
      type: 'affiliation',
      institution: getText(el, 'institution[content-type=orgname]'),
      division1: getText(el, 'institution[content-type=orgdiv1]'),
      division2: getText(el, 'institution[content-type=orgdiv2]'),
      division3: getText(el, 'institution[content-type=orgdiv3]'),
      street: getText(el, 'addr-line[content-type=street-address]'),
      addressComplements: getText(el, 'addr-line[content-type=complements]'),
      city: getText(el, 'city'),
      state: getText(el, 'state'),
      postalCode: getText(el, 'postal-code'),
      country: getText(el, 'country'),
      phone: getText(el, 'phone'),
      fax: getText(el, 'fax'),
      email: getText(el, 'email'),
      uri: getText(el, 'uri[content-type=link]')
    }
    return doc.create(org).id
  })
  doc.set(['metadata', 'affiliations'], orgIds)
}