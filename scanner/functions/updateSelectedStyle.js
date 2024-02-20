function updateSelectedStyle() {
  items.forEach(function (item, index) {
    $('[data-id=' + index + ']')
      .find('.square')
      .toggleClass('selected', selected.indexOf(index) > -1);
  });
  toggleActions();
}