constructor(docId, data, password, evaluatorOptions, enableXfa, docBaseUrl) {
    super();
    this._docId = docId;
    this._password = password;
    this._docBaseUrl = parseDocBaseUrl(docBaseUrl);
    this.evaluatorOptions = evaluatorOptions;
    this.enableXfa = enableXfa;
    const stream = new _stream.Stream(data);
    this.pdfDocument = new _document.PDFDocument(this, stream);
    this._loadedStreamPromise = Promise.resolve(stream);
  }