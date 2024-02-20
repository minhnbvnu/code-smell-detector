function makeTmpDocument(doc, ab) {
  // create temp document (pretty slow -- ~1.5s)
  var artboardBounds = ab.artboardRect;
  var doc2 = app.documents.add(DocumentColorSpace.RGB, doc.width, doc.height, 1);
  doc2.pageOrigin = doc.pageOrigin; // not sure if needed
  doc2.rulerOrigin = doc.rulerOrigin;
  // The following caused MRAP
  // doc2.artboards[0].artboardRect = ab.artboardRect;
  doc2.artboards[0].artboardRect = artboardBounds;
  return doc2;
}