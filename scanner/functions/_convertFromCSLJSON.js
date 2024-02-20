function _convertFromCSLJSON (source, type) {
  const date = _extractDateFromCSLJSON(source)

  let data = {
    type: type,

    title: source.title,
    containerTitle: source['container-title'],
    volume: source.volume,
    issue: source.issue,
    pageRange: source.page,
    doi: source.DOI,
    pmid: source.PMID,

    edition: source.edition,
    publisherLoc: source['publisher-place'],
    publisherName: source.publisher,
    pageCount: source['number-of-pages'],
    partTitle: source.section,
    confName: source.event,
    confLoc: source['event-place'],
    isbn: source.ISBN,

    year: date.year,
    month: date.month,
    day: date.day,

    uri: source.URL,
    version: source.version

    /* Examples with no corresponding field:
        - abstract
        - accessed
        - composer
        - director
        - ISSN
        - language
        - number-of-volumes
        - PMCID
        - title-short
        - translator
    */
  }

  // series
  if (source['collection-title']) {
    data.series = source['collection-title']
    if (source['collection-number']) {
      data.series += '; ' + source['collection-number']
    }
  }

  // Authors, editors, translators, inventors
  if (source.author) {
    if (type === 'patent') {
      data.inventors = source.author.map(a => { return { name: a.family, givenNames: a.given, type: 'ref-contrib' } })
    } else {
      data.authors = source.author.map(a => { return { name: a.family, givenNames: a.given, type: 'ref-contrib' } })
    }
  }
  if (source.editor) {
    data.editors = source.editor.map(a => { return { name: a.family, givenNames: a.given, type: 'ref-contrib' } })
  }
  if (source.translator) {
    data.translators = source.translator.map(a => { return { name: a.family, givenNames: a.given, type: 'ref-contrib' } })
  }

  // Cleanup output to avoid any undefined values
  Object.keys(data).forEach(key => {
    if (data[key] === undefined) {
      delete data[key]
    }
  })

  if (!data.doi) {
    // TODO: We should not rely that the imported item has a DOI, because it can also be imported from a generic CSL JSON file.
    //  However, there are some problems in the further processing withouth a DOI at the moment...
    throw new Error(`Citation must have DOI.`)
  }

  return data
}