function VideoAdComponent(adVideoSource, adLink, adCloseFunction) {
    var closeText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '关闭广告';

    _classCallCheck(this, VideoAdComponent);

    this.adVideoSource = adVideoSource;
    this.adLink = adLink;
    this.html = (0, _utils.parseDom)(_index2.default);
    this.adInterval = null;
    this.adCloseFunction = adCloseFunction;
    this.html.querySelector('.video-ad-close-text').innerText = closeText;

    this.adDuration = null; // 视频广告的时长, 用于倒计时, 
    this.player = null;
  }