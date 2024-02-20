function modifyClassList(els, callback) {
  els.forEach(el => {
    if (!el) return
    callback(el.classList)
  })
}