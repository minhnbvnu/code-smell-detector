function convertCSLJSON (source) {
  let bibType = source.type
  let result

  // CSL types: http://docs.citationstyles.org/en/stable/specification.html#appendix-iii-types
  let typeMapping = {
    'article': ARTICLE_REF,
    'article-magazine': MAGAZINE_ARTICLE_REF,
    'article-newspaper': NEWSPAPER_ARTICLE_REF,
    'article-journal': JOURNAL_ARTICLE_REF,
    // "bill"
    'book': BOOK_REF,
    // "broadcast"
    'chapter': CHAPTER_REF,
    'dataset': DATA_PUBLICATION_REF,
    // "entry"
    'entry-dictionary': BOOK_REF,
    'entry-encyclopedia': BOOK_REF,
    // "figure"
    // "graphic"
    // "interview"
    // "legislation"
    // "legal_case"
    // "manuscript"
    // "map"
    // "motion_picture"
    // "musical_score"
    // "pamphlet"
    'paper-conference': CONFERENCE_PAPER_REF,
    'patent': PATENT_REF,
    // "post"
    // "post-weblog"
    // "personal_communication"
    'report': REPORT_REF,
    // "review"
    // "review-book"
    // "song"
    // "speech"
    'thesis': THESIS_REF,
    // "treaty"
    'webpage': WEBPAGE_REF
    // NA : "software"
  }

  if (typeMapping[bibType]) {
    result = _convertFromCSLJSON(source, typeMapping[bibType])
  } else {
    throw new Error(`Bib type ${bibType} not yet supported`)
  }
  return result
}