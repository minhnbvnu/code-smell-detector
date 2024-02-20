function Portals(props) {
    var _this;

    _classCallCheck(this, Portals);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Portals).call(this, props)); // Init Env

    _this.target = props.target || document.body;
    _this.container = document.createElement('figure');
    _this.container.id = props.id;
    _this.container.className = props.className;
    _this.container.style.zIndex = props.zIndex;

    _this.target.appendChild(_this.container);

    return _this;
  }