function _importPersonGroup (el, doc, type) {
  let groupEl = el.find(`person-group[person-group-type=${type}]`)
  if (groupEl) {
    return groupEl.children.reduce((ids, childEl) => {
      let refContrib = _importRefContrib(doc, childEl)
      if (refContrib) ids.push(refContrib.id)
      return ids
    }, [])
  } else {
    return []
  }
}