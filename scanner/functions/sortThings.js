function sortThings(opts, sorter, sorted, tableDiv) {
  if (opts.tableDiv != tableDiv) return
  opts.data.sort(function(a,b){
    if (a[sorter]<b[sorter]) return -1
    if (a[sorter]>b[sorter]) return 1
    return 0
  })
  if (sorted === "descending") opts.data.reverse()
  makeTable(opts)
  var header
  $(tableDiv + " .tHeader").each(function(i, el){
    var contents = resolveDataTitle($(el).text())
    if (contents === sorter) header = el
  })
  $(header).attr("data-sorted", sorted)
}