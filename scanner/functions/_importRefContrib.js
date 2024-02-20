function _importRefContrib (doc, el) {
  let refContrib = {
    type: 'ref-contrib'
  }
  if (el.tagName === 'name') {
    refContrib.givenNames = getText(el, 'given-names')
    refContrib.name = getText(el, 'surname')
    // TODO: We may want to consider prefix postfix, and mix it into givenNames, or name properties
    // We don't want separate fields because this gets complex/annoying during editing
    // prefix: getText(el, 'prefix'),
    // suffix: getText(el, 'suffix'),
  } else if (el.tagName === 'collab') {
    refContrib.name = getText(el, 'named-content[content-type=name]')
  } else {
    console.warn(`${el.tagName} not supported inside <person-group>`)
    return null
  }
  return doc.create(refContrib)
}