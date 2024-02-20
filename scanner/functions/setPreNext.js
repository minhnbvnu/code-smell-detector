function  setPreNext(targetDiv, currentPage, currentPage, totalPages, data, pagination) {
  var tableId = targetDiv.slice(1)
  $(targetDiv).append("<div id='Pagination' pageno='" + currentPage + "'" + "class='table-pagination'>Showing page "
    + currentPage + " of " + totalPages + " <a class='pagination-pre-" + tableId + "'>Previous</a>" +
    " <a class='pagination-next-" + tableId + "'>Next</a></p></div>" )
}