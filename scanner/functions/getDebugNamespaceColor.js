function getDebugNamespaceColor (namespace) {
  var type = getDebugNamespaceType(namespace);

  var color = settings.colors && settings.colors[type];

  return color || null;
}