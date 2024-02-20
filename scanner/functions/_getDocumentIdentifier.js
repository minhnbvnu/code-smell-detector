function _getDocumentIdentifier(doc) {
    return doc._wysihtml5_identifier || (doc._wysihtml5_identifier = DOCUMENT_IDENTIFIER++);
  }