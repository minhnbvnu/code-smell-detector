function ReactZmageWrapper(props) {
    var _this;

    Zmage_wrapper_classCallCheck(this, ReactZmageWrapper);

    _this = Zmage_wrapper_possibleConstructorReturn(this, Zmage_wrapper_getPrototypeOf(ReactZmageWrapper).call(this, props));

    Zmage_wrapper_defineProperty(Zmage_wrapper_assertThisInitialized(_this), "attachBrowserToImage", function () {
      var _this$props = _this.props,
          children = _this$props.children,
          restProps = Zmage_wrapper_objectWithoutProperties(_this$props, ["children"]);

      if (_this.contentRef.current) {
        _this.contentRef.current.querySelectorAll('img').forEach(function (item) {
          if (!item.getAttribute('zmage') && item.getAttribute('src')) {
            item.style.cursor = 'zoom-in';
            item.setAttribute('zmage', Date.now());
            item.addEventListener('click', function () {
              return Zmage_callee(Zmage_wrapper_objectSpread({}, restProps, {
                coverRef: {
                  current: item
                },
                src: item.getAttribute('src')
              }));
            });
          }
        });
      }
    });

    _this.contentRef = external_react_default.a.createRef();
    return _this;
  }