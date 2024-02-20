function _populateFunders (doc, jats) {
  const awardEls = jats.findAll('article > front > article-meta > funding-group > award-group')
  let funderIds = awardEls.map(el => {
    let funder = {
      id: el.id,
      type: 'funder',
      institution: getText(el, 'institution'),
      fundRefId: getText(el, 'institution-id'),
      awardId: getText(el, 'award-id')
    }
    return doc.create(funder).id
  })
  doc.set(['metadata', 'funders'], funderIds)
}