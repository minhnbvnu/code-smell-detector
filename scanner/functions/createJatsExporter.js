function createJatsExporter (jatsDom, doc) {
  let config = new TextureConfigurator()
  config.import(ArticlePackage)
  let articleConfig = config.getConfiguration('article')
  let exporter = articleConfig.createExporter('jats')
  return exporter
}