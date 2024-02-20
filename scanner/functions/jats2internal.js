function jats2internal (jats, doc, jatsImporter) {
  // metadata
  _populateAffiliations(doc, jats)
  _populateAuthors(doc, jats, jatsImporter)
  _populateEditors(doc, jats, jatsImporter)
  _populateFunders(doc, jats)
  _populateArticleInfo(doc, jats, jatsImporter)
  _populateKeywords(doc, jats, jatsImporter)
  _populateSubjects(doc, jats)

  // content
  _populateTitle(doc, jats, jatsImporter)
  _populateSubTitle(doc, jats, jatsImporter)
  _populateAbstract(doc, jats, jatsImporter)
  _populateBody(doc, jats, jatsImporter)
  _populateFootnotes(doc, jats, jatsImporter)
  _populateReferences(doc, jats, jatsImporter)

  return doc
}