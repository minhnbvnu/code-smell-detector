function sortByKey(list, key) {
  return list.sort(function (a, b) {
    return a[key] > b[key] ? 1 : 0
  })
}