function updateWidgetHeight(line) {
  if (line.widgets) { for (var i = 0; i < line.widgets.length; ++i)
    { line.widgets[i].height = line.widgets[i].node.parentNode.offsetHeight; } }
}