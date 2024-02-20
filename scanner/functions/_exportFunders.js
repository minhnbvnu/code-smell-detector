function _exportFunders (jats, doc) {
  const $$ = jats.$$
  let funders = doc.resolve(['metadata', 'funders'])
  if (funders.length > 0) {
    let fundingGroupEl = $$('funding-group')
    funders.forEach(funder => {
      let el = $$('award-group').attr('id', funder.id)
      let institutionWrapEl = $$('institution-wrap')
      institutionWrapEl.append(_createTextElement($$, funder.fundRefId, 'institution-id', { 'institution-id-type': 'FundRef' }))
      institutionWrapEl.append(_createTextElement($$, funder.institution, 'institution'))
      el.append(
        $$('funding-source').append(institutionWrapEl),
        _createTextElement($$, funder.awardId, 'award-id')
      )
      fundingGroupEl.append(el)
    })
    return fundingGroupEl
  }
}