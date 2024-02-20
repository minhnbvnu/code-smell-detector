function renderDocs(story, docsContext, element, callback) {
  return renderDocsAsync(story, docsContext, element).then(callback);
}