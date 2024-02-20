function getDomNode(element) {
  return (element instanceof angular.element) ? element[0] : element;
}