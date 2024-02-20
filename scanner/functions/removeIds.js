function removeIds(elem) {
    elem.removeAttribute('id')
    for (var i = 0, n = elem.childElementCount; i < n; ++i)
      removeIds(elem.children[i])
    return elem
  }