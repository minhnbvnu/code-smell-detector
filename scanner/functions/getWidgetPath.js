function getWidgetPath (modulePath, widgetName) {
  if (!widgetName) {
    return '';
  }
  return path.join(modulePath, 'dist', '_', 'widget', widgetName);
}