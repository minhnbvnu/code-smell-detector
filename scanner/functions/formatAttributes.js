function formatAttributes(attributes, opts) {
  if (!attributes) return;
  return Object.keys(attributes).map(function (key) {
    var _a, _b;
    var value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
    if (opts.xmlMode === "foreign") {
      /* Fix up mixed-case attribute names */
      key = (_b = foreignNames_1.attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
    }
    if (!opts.emptyAttrs && !opts.xmlMode && value === "") {
      return key;
    }
    return key + "=\"" + (opts.decodeEntities !== false ? entities_1.encodeXML(value) : value.replace(/"/g, "&quot;")) + "\"";
  }).join(" ");
}