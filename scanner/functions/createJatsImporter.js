function createJatsImporter (doc) {
  let config = new TextureConfigurator()
  config.import(ArticlePackage)
  let articleConfig = config.getConfiguration('article')
  if (!doc) {
    let schema = new DocumentSchema({
      DocumentClass: InternalArticleDocument,
      nodes: articleConfig.getNodes(),
      // TODO: try to get rid of this by using property schema
      defaultTextType: 'paragraph'
    })
    doc = InternalArticleDocument.createEmptyArticle(schema)
  }
  let importer = articleConfig.createImporter('jats', doc)
  return importer
}