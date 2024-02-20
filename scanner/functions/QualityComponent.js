function QualityComponent(getQuality) {
    _classCallCheck(this, QualityComponent);

    this.html = (0, _utils.parseDom)(_index2.default);
    this.modalHtml = (0, _utils.parseDom)(_qualityModal2.default);
    this.hasCreated = false;
    this.definition = '';
    this.getQuality = getQuality;
  }