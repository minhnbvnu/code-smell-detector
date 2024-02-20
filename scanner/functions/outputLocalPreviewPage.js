function outputLocalPreviewPage(textForFile, localPreviewDestination, settings) {
  var localPreviewTemplateText = readTextFile(docPath + settings.local_preview_template);
  settings.ai2htmlPartial = textForFile; // TODO: don't modify global settings this way
  var localPreviewHtml = applyTemplate(localPreviewTemplateText, settings);
  saveTextFile(localPreviewDestination, localPreviewHtml);
}