function Labelise(tapeItem) {
  tapeItem.valueType = tapeItem.type;
  tapeItem.type = 2;
  tapeItem.label = tapeItem.constructor.name.toUpperCase();
  return tapeItem;
}