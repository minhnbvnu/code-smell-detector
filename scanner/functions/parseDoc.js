function parseDoc(query, doc) {
    if (!doc) return null;
    if (query.docFormat == "full") return doc;
    var parabreak = /.\n[\s@\n]/.exec(doc);
    if (parabreak) doc = doc.slice(0, parabreak.index + 1);
    doc = doc.replace(/\n\s*/g, " ");
    if (doc.length < 100) return doc;
    var sentenceEnd = /[\.!?] [A-Z]/g;
    sentenceEnd.lastIndex = 80;
    var found = sentenceEnd.exec(doc);
    if (found) doc = doc.slice(0, found.index + 1);
    return doc;
  }