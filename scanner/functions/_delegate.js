function _delegate (fn) {
  return function (entityId, db, exporter, options) {
    let el = _createElement()
    let $$ = el.createElement.bind(el)
    let fragments = fn($$, entityId, db, exporter, options)
    el.append(fragments)
    return el.innerHTML
  }
}