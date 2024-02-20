function copyLayerOrItem(item) {
    if (item.typename == 'Layer') {
      copyLayer(item);
    } else {
      copyPageItem(item, destGroup);
    }
  }