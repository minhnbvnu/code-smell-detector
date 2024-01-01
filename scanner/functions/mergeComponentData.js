function mergeComponentData (attrValue, extraData) {
  // Extra data not defined, just return attrValue.
  if (!extraData) { return attrValue; }

  // Merge multi-property data.
  if (extraData.constructor === Object) {
    return utils.extend(extraData, utils.styleParser.parse(attrValue || {}));
  }

  // Return data, precendence to the defined value.
  return attrValue || extraData;
}