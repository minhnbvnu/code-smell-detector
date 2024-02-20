function jsxTagName(tagName) {
  var name = tagName.toLowerCase();

  if (ELEMENT_TAG_NAME_MAPPING.hasOwnProperty(name)) {
    name = ELEMENT_TAG_NAME_MAPPING[name];
  }

  return name;
}