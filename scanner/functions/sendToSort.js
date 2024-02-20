function sendToSort(event) {
    var tableDiv = "#" + $(event.target).closest("div").attr("id")
    var sorted = $(event.target).attr("data-sorted")
    if (sorted) {
      if (sorted === "descending") sorted = "ascending"
      else sorted = "descending"
    }
    else { sorted = "ascending" }
    var sorter = resolveDataTitle(event.target.innerHTML)
    var sortInfo = {"sorter": sorter, "sorted": sorted, "tableDiv": tableDiv}
    sortThings(options, sorter, sorted, tableDiv)
  }