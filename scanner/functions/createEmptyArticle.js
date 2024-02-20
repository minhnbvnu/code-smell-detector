function createEmptyArticle () {
  let config = new TextureConfigurator()
  config.import(ArticlePackage)
  let articleConfig = config.getConfiguration('article')
  let schema = new DocumentSchema({
    DocumentClass: InternalArticleDocument,
    nodes: articleConfig.getNodes(),
    // TODO: try to get rid of this by using property schema
    defaultTextType: 'paragraph'
  })
  return InternalArticleDocument.createEmptyArticle(schema)
}