function attributesFromElement(element, names) {
  if (isSVGElement(element)) return attributesFromSVGElement(element, names);else if (isCheerioObject(element)) return attributesFromCheerioObject(element, names);else return null;
}