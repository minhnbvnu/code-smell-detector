function getOneSelectedElement(orderOfItem) {
  var index = orderOfItem !== undefined ? orderOfItem : selected[0];
  return items[index];
}