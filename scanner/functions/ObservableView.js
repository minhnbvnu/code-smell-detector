function ObservableView(area, _ref) {
    var _this = this;

    var key = _ref.key,
        name = _ref.name,
        props = _ref.props;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, ObservableView);

    this.area = area;
    this.id = Object(__WEBPACK_IMPORTED_MODULE_4__obx_utils__["s" /* nextId */])();
    this.key = void 0;
    this.name = void 0;
    this.observing = [];
    this.observers = new Set();
    this.dependenciesState = __WEBPACK_IMPORTED_MODULE_7__obx_derivation__["a" /* DerivationState */].NOT_TRACKING;
    this.lowestObserverState = __WEBPACK_IMPORTED_MODULE_7__obx_derivation__["a" /* DerivationState */].UP_TO_DATE;
    this.scope = void 0;
    this.isComputing = false;
    this.computeFn = void 0;
    this.data = void 0;
    this.propsArr = [];
    this.propsMap = {};
    this.key = key;
    this.name = "".concat(name, "@").concat(this.id);
    this.propsArr = (props || []).map(function (config) {
      var prop = new __WEBPACK_IMPORTED_MODULE_5__prop__["a" /* default */](area, config, _this);

      if (!prop.isSpread()) {
        _this.propsMap[prop.key] = prop;
      }

      return prop;
    });
    this.scope = this.area.scope;

    var component = this.scope.__V.get(name);

    var v = this; // tslint:disable-line

    var listen = function listen(prop) {
      return function f() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var ret = prop.apply(this, args);
        v.refresh();
        return ret;
      };
    };

    this.computeFn = function () {
      var maps = {};
      var klass = [];
      var styles = [];
      var events = {};

      for (var i = 0, l = _this.propsArr.length; i < l; i++) {
        var prop = _this.propsArr[i];

        if (prop.isSpread()) {
          var spreadData = prop.getData();

          for (var _key3 in spreadData) {
            if (Object(__WEBPACK_IMPORTED_MODULE_4__obx_utils__["k" /* hasOwnProperty */])(spreadData, _key3)) {
              processData(_key3, spreadData[_key3], klass, styles, events, maps, listen);
            }
          }
        } else {
          processData(prop.key, prop.getData(), klass, styles, events, maps, listen);
        }
      }

      if (!maps.key) {
        maps.key = "".concat(_this.key, "-").concat(_this.id);
      }

      if (klass.length > 0) {
        maps.className = __WEBPACK_IMPORTED_MODULE_3_classnames___default()(klass);
      }

      if (styles.length > 0) {
        maps.style = __WEBPACK_IMPORTED_MODULE_4__obx_utils__["t" /* objectAssign */].apply(void 0, [{}].concat(styles));
      }

      if (maps.ref && typeof maps.ref === 'string') {
        var refKey = maps.ref;

        maps.ref = function (ref) {
          _this.scope.$set("$refs/".concat(refKey), ref);
        };
      }

      if ('x-model' in maps) {
        var data = maps['x-model'];
        delete maps['x-model'];

        if (component === 'input') {
          if (maps.type === 'radio') {
            maps.checked = Object(__WEBPACK_IMPORTED_MODULE_4__obx_utils__["q" /* looseEqual */])(maps.value, data);
          } else if (maps.type === 'checkbox') {
            if (Array.isArray(data)) {
              maps.checked = Object(__WEBPACK_IMPORTED_MODULE_4__obx_utils__["r" /* looseIndexOf */])(data, maps.value) > -1;
            } else {
              maps.checked = Object(__WEBPACK_IMPORTED_MODULE_4__obx_utils__["q" /* looseEqual */])(data, true);
            }
          } else {
            maps.value = data;
          }
        } else if (component && component.propTypes) {
          maps[component.propTypes.checked ? 'checked' : 'value'] = data;
        } else {
          maps.value = data;
        }
      }

      mergeEvents(maps, events, listen);
      return maps;
    };
  }