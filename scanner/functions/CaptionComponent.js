function CaptionComponent() {
    _classCallCheck(this, CaptionComponent);

    this.captionList = null;
    this.html = (0, _utils.parseDom)(_index2.default);
    this.modalHtml = (0, _utils.parseDom)(_captionModal2.default);
    this.hasCreated = false;
    this.definition = '';
  }