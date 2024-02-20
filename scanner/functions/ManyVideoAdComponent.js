function ManyVideoAdComponent(adVideoSource, adCloseFunction) {
    var closeText = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '关闭广告';

    _classCallCheck(this, ManyVideoAdComponent);

    this.adVideoSource = adVideoSource;
    this.html = (0, _utils.parseDom)(_index2.default);
    this.adInterval = null;
    this.adCloseFunction = adCloseFunction;
    this.html.querySelector('.many-video-ad-close-text').innerText = closeText;
    this.adDuration = null; // 视频广告的时长, 用于倒计时, 
    this.player = null;
    this.indexVideo = 1; //给广告视频标号
  }