function createSettingsBlock(settings) {
  var bounds      = getAllArtboardBounds();
  var fontSize    = 15;
  var leading     = 19;
  var extraLines  = 6;
  var width       = 400;
  var left        = bounds[0] - width - 50;
  var top         = bounds[1];
  var settingsLines = ["ai2html-settings"];
  var layer, rect, textArea, height;

  forEach(settings.settings_block, function(key) {
    settingsLines.push(key + ": " + settings[key]);
  });

  try {
    layer = doc.layers.getByName("ai2html-settings");
    layer.locked = false;
  } catch(e) {
    layer = doc.layers.add();
    layer.zOrder(ZOrderMethod.BRINGTOFRONT);
    layer.name  = "ai2html-settings";
  }

  height = leading * (settingsLines.length + extraLines);
  rect = layer.pathItems.rectangle(top, left, width, height);
  textArea = layer.textFrames.areaText(rect);
  textArea.textRange.autoLeading = false;
  textArea.textRange.characterAttributes.leading = leading;
  textArea.textRange.characterAttributes.size = fontSize;
  textArea.contents = settingsLines.join('\n');
  textArea.name = 'ai2html-settings';
  message("A settings text block was created to the left of all your artboards.");
  return textArea;
}