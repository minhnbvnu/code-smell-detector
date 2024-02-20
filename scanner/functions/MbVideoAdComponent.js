function MbVideoAdComponent(adVideoSource, adLink, adCloseFunction) {
    var closeText = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '关闭广告';

    _classCallCheck(this, MbVideoAdComponent);

    this.adVideoSource = adVideoSource;
    this.adLink = adLink;
    this.html = (0, _utils.parseDom)(_mbIndex2.default);
    this.adInterval = null;
    this.adCloseFunction = adCloseFunction;
    this.html.querySelector('.video-ad-close-text').innerText = closeText;
    this.html.querySelector('.video-ad-link').setAttribute('href', this.adLink);
    this.html.querySelector('.video-ad-detail').setAttribute('href', this.adLink);
    this.adDuration = null; // 视频广告的时长, 用于倒计时, 
  }