function mappingAttributesFromReactConfig(config) {
  eachObj(config.Properties, function(propname) {
    var mapFrom = config.DOMAttributeNames[propname] || propname.toLowerCase();

    if (!ATTRIBUTE_MAPPING[mapFrom])
      ATTRIBUTE_MAPPING[mapFrom] = propname;
  });
}