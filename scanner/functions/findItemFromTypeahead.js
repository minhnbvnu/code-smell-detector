function findItemFromTypeahead(items, string) {
  if (string === void 0) {
    string = "";
  }

  if (!string) {
    return null;
  }

  var found = items.find(function (item) {
    var _item$element, _item$element$dataset, _item$element$dataset2;

    return item.disabled ? false : (_item$element = item.element) == null ? void 0 : (_item$element$dataset = _item$element.dataset) == null ? void 0 : (_item$element$dataset2 = _item$element$dataset.valuetext) == null ? void 0 : _item$element$dataset2.toLowerCase().startsWith(string);
  });
  return found ? items.indexOf(found) : null;
}