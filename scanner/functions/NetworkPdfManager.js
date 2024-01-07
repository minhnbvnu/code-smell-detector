constructor(docId, pdfNetworkStream, args, evaluatorOptions, enableXfa, docBaseUrl) {
    super();
    this._docId = docId;
    this._password = args.password;
    this._docBaseUrl = parseDocBaseUrl(docBaseUrl);
    this.msgHandler = args.msgHandler;
    this.evaluatorOptions = evaluatorOptions;
    this.enableXfa = enableXfa;
    this.streamManager = new _chunked_stream.ChunkedStreamManager(pdfNetworkStream, {
      msgHandler: args.msgHandler,
      length: args.length,
      disableAutoFetch: args.disableAutoFetch,
      rangeChunkSize: args.rangeChunkSize
    });
    this.pdfDocument = new _document.PDFDocument(this, this.streamManager.getStream());
  }