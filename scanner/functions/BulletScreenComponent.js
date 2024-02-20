function BulletScreenComponent(text, style) {
    var bulletPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'random';

    _classCallCheck(this, BulletScreenComponent);

    this.text = text;
    this.style = style || { fontSize: '14px', color: '#fff' };
    this.html = (0, _utils.parseDom)(_index2.default);
    // this.html.style.animationPlayState = 'paused'
    this.bulletPosition = bulletPosition;
  }