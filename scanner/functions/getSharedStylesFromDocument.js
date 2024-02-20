function getSharedStylesFromDocument(document) {
  const result = [];
  const sharedStyles = document.layerStyles().sharedStyles();
  sharedStyles.forEach((elm) => {
    // if (elm.style().hasEnabledFill() || elm.style().hasEnabledBorder()) {
    result.push(elm);
    // }
  });
  return result;
}