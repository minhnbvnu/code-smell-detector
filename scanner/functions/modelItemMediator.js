function modelItemMediator(item, index) {
  const { Model } = this;

  // if an item is already instance of Model
  if (item instanceof Model) {
    return item;
  }

  let itemData;

  if (item && typeof item.toJSON === 'function') {
    // if item is not falsy and if it has toJSON method
    // then retrieve instance data by this method
    itemData = item.toJSON(false);
  } else {
    // if not then use an item as its data
    itemData = item;
  }

  return new Model(itemData, this, index);
}