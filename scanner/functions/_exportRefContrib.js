function _exportRefContrib ($$, refContrib) {
  let el
  if (refContrib.givenNames) {
    el = $$('name')
    el.append(_createTextElement($$, refContrib.name, 'surname'))
    el.append(_createTextElement($$, refContrib.givenNames, 'given-names'))
  } else if (refContrib.name) {
    el = $$('collab')
    el.append(_createTextElement($$, refContrib.name, 'named-content', { 'content-type': 'name' }))
  } else {
    console.warn('No content found for refContrib node')
  }
  return el
}