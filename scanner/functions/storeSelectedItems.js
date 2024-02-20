function storeSelectedItems(obj, selection) {
  var items = obj.items = [];
  var texts = obj.textframes = [];
  var item;
  for (var i=0, n=selection.length; i<n; i++) {
    item = selection[i];
    items[i] = item; // faster than push() in this JS engine
    if (item.typename == 'TextFrame') {
      texts.push(item);
    }
  }
}