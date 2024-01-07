function placemarkStyleMapParser(node, objectStack) {
  const styleMapValue = readStyleMapValue.call(this, node, objectStack);
  if (!styleMapValue) {
    return;
  }
  const placemarkObject = objectStack[objectStack.length - 1];
  if (Array.isArray(styleMapValue)) {
    placemarkObject['Style'] = styleMapValue;
  } else if (typeof styleMapValue === 'string') {
    placemarkObject['styleUrl'] = styleMapValue;
  } else {
    throw new Error('`styleMapValue` has an unknown type');
  }
}