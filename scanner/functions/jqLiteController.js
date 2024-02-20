function jqLiteController(element, name) {
  return jqLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
}