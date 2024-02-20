function PlaylistComponent(playlist) {
    _classCallCheck(this, PlaylistComponent);

    this.controlHtml = (0, _utils.parseDom)(_index2.default);
    this.listHtml = (0, _utils.parseDom)(_list2.default);
    this.playlist = playlist;
    this.playingVideoIndex = 0;
    this.listHideTimeout = null;
  }