function TrackComponent() {
    _classCallCheck(this, TrackComponent);

    this.trackList = null;
    this.html = (0, _utils.parseDom)(_index2.default);
    this.modalHtml = (0, _utils.parseDom)(_trackModal2.default);
    this.hasCreated = false;
    this.definition = '';
  }