function AliplayerDanmuComponent(danmukuList) {
    var sendEl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'controlbar';

    _classCallCheck(this, AliplayerDanmuComponent);

    this.sendEl = sendEl;
    this.danmukuList = danmukuList;
    this.html = (0, _utils.parseDom)(_index2.default);
    this.danmuControlHtml = (0, _utils.parseDom)(_danmuControl2.default);
    this.sendEl = sendEl;
    this.danmuInput = sendEl === null ? null : (0, _utils.parseDom)(_danmuInput2.default);
    this.CM = null;
    this.userDanmuOpen = true; // 用户打开关闭弹幕的状态, 默认为 true 打开
  }