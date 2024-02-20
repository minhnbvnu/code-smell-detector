function PreviewVodComponent(previewDuration) {
    var previewEndHtml = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var previewBarHtml = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, PreviewVodComponent);

    this.previewDuration = previewDuration;
    this.html = (0, _utils.parseDom)(_index2.default);

    // 在试看结束之后, 如果用户自定义
    if (previewEndHtml !== null) {
      this.insertHTtml(previewEndHtml, 'previewEndHtml');
    }
    if (previewBarHtml !== null) {
      this.insertHTtml(previewBarHtml, 'previewBarHtml');
    }
  }