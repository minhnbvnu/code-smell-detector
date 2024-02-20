function createPagination(paginationSetting) {
  var el = $('<ul class="pagination" role="navigation"></ul>');

  var currentPage = paginationSetting.current_page;
  var pageRange = 5;
  var totalPage = Math.ceil(paginationSetting.total / paginationSetting.per_page);

  var rangeStart = currentPage - pageRange;
  var rangeEnd = currentPage + pageRange;

  if (rangeEnd > totalPage) {
    rangeEnd = totalPage;
    rangeStart = totalPage - pageRange * 2;
    rangeStart = rangeStart < 1 ? 1 : rangeStart;
  }

  if (rangeStart <= 1) {
    rangeStart = 1;
    rangeEnd = Math.min(pageRange * 2 + 1, totalPage);
  }

  generatePaginationHTML(el, {
    totalPage: totalPage,
    currentPage: currentPage,
    pageRange: pageRange,
    rangeStart: rangeStart,
    rangeEnd: rangeEnd
  });

  $('#pagination').append(el);
}