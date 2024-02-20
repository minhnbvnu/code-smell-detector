function matchPartsAgainstList(source, list) {
  return list.find((target) => {
    // target domain has more parts than source, fail
    if (target.length > source.length) return false
    // source matches target or (is deeper subdomain)
    return target.every((part, index) => source[index] === part)
  })
}