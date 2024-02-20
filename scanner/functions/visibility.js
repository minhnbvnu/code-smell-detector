function visibility(i, height) {
    const e = all[i]
    const r = e.parentNode.getBoundingClientRect()
    return height <= r.top ? 1 : r.bottom < 0 ? -1 : 0
  }