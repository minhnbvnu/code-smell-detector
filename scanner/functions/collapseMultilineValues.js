function collapseMultilineValues(li) {
  const tmp = []
  let last
  for (let i = 0; i < li.length; ++i) {
    if (li[i].length === 2) {
      // store the last valid entry to append invalid entries to
      last = li[i]
      tmp.push(last)
    } else {
      last[1] += li[i][0]
    }
  }

  return tmp
}