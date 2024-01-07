constructor({
    pageDiv,
    pdfPage
  }) {
    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.div = null;
    this._cancelled = false;
  }