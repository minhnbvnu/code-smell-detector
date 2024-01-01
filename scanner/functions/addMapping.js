function addMapping (prop) {
  // To hyphenated.
  var htmlAttrName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  if (prop === 'fog') { htmlAttrName = 'material-fog'; }
  if (prop === 'visible') { htmlAttrName = 'material-visible'; }
  materialMappings[htmlAttrName] = 'material.' + prop;
}