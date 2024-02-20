function setPagClicks(data, tableId, currentPage, pagination, totalPages) {
  $(".pagination-pre-" + tableId).addClass("no-pag")
    
  $(document).on("click", (".pagination-next-" + tableId), function() {
    if ($(this).hasClass("no-pag")) return

    currentPage = currentPage + 1
    var nextPage = currentPage + 1
    currentStart = (currentPage * pagination) - pagination
    currentEnd = currentPage * pagination

    if (currentPage >= totalPages) {
      currentRows = data.slice(currentStart, currentEnd)
      table(currentRows, "#" + tableId)
      setPreNext("#" + tableId, currentPage, currentPage, totalPages)
      $(".pagination-next-" + tableId).addClass("no-pag")
      $(".pagination-next-" + tableId)
    }
    else {
      currentRows = data.slice(currentStart, currentEnd)
      table(currentRows, "#" + tableId)
      setPreNext("#" + tableId, currentPage, currentPage, totalPages)
    }
})

  $(document).on("click", (".pagination-pre-" + tableId), function() {
    if (currentPage > 1) $(this).removeClass("no-pag")
    if ($(this).hasClass("no-pag")) return

    // if ((currentPage) === 2) {
    //   $(".pagination-pre-" + tableId).addClass("no-pag"); console.log("on page one!", currentPage)
    // }

    currentPage = currentPage - 1
    var nextPage = currentPage + 1
    currentStart = (currentPage * pagination) - pagination
    currentEnd = currentPage * pagination

    // currentRows = data.slice(currentStart, currentEnd)
    // table(currentRows, "#" + tableId)
    // setPreNext("#" + tableId, currentPage, currentPage, totalPages)

    if (currentPage === 1) {
      currentRows = data.slice(currentStart, currentEnd)
      table(currentRows, "#" + tableId)
      setPreNext("#" + tableId, currentPage, currentPage, totalPages)
      $(".pagination-pre-" + tableId).addClass("no-pag")
    }
    else {
      currentRows = data.slice(currentStart, currentEnd)
      table(currentRows, "#" + tableId)
      setPreNext("#" + tableId, currentPage, currentPage, totalPages)
    }
    
  })
}