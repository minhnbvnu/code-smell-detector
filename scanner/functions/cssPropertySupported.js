function cssPropertySupported(properties) {
  properties = typeof(properties) == 'string' ? Array(properties) : properties

  var supported = properties.filter(function(property){
    return property in document.body.style;
  });

  return properties.length == supported.length;
}