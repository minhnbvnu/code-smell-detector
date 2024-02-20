function StartADComponent(coverUrl, adUrl, adDuration) {
    _classCallCheck(this, StartADComponent);

    this.coverUrl = coverUrl;
    this.adUrl = adUrl;
    this.adDuration = adDuration;
    if (adDuration <= 0) {
      throw Error('adDuration must must be greater than 0');
    }
    this.html = (0, _utils.parseDom)(_index2.default);
  }