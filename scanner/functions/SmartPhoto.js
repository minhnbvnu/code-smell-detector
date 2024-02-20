function SmartPhoto(selector, settings) {
    var _this;

    _classCallCheck(this, SmartPhoto);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SmartPhoto).call(this));
    _this.data = util.extend({}, defaults, settings);
    _this.data.currentIndex = 0;
    _this.data.oldIndex = 0;
    _this.data.hide = true;
    _this.data.group = {};
    _this.data.scaleSize = 1;
    _this.data.scale = false;
    _this.pos = {
      x: 0,
      y: 0
    };
    _this.data.photoPosX = 0;
    _this.data.photoPosY = 0;
    _this.handlers = [];
    _this.convert = {
      increment: _this.increment,
      virtualPos: _this.virtualPos,
      round: _this.round
    };
    _this.data.groupItems = _this.groupItems;
    _this.elements = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
    var date = new Date();
    _this.tapSecond = date.getTime();
    _this.onListMove = false;
    _this.clicked = false;
    _this.id = _this._getUniqId();
    _this.vx = 0;
    _this.vy = 0;
    _this.data.appearEffect = null;

    _this.addTemplate(_this.id, template);

    _this.data.isSmartPhone = _this._isSmartPhone();
    var body = document.querySelector('body');
    util.append(body, "<div data-id='".concat(_this.id, "'></div>"));
    [].forEach.call(_this.elements, function (element) {
      _this.addNewItem(element);
    });

    _this.update();

    var currentItem = _this._getCurrentItemByHash();

    if (currentItem) {
      util.triggerEvent(currentItem.element, 'click');
    }

    _this.interval = setInterval(function () {
      _this._doAnim();
    }, _this.data.forceInterval);

    if (!_this.data.isSmartPhone) {
      var resizeHandler = function resizeHandler() {
        if (!_this.groupItems()) {
          return;
        }

        _this._resetTranslate();

        _this._setPosByCurrentIndex();

        _this._setSizeByScreen();

        _this.update();
      };

      var keydownHandler = function keydownHandler(e) {
        var code = e.keyCode || e.which;

        if (_this.data.hide === true) {
          return;
        }

        if (code === 37) {
          _this.gotoSlide(_this.data.prev);
        } else if (code === 39) {
          _this.gotoSlide(_this.data.next);
        } else if (code === 27) {
          _this.hidePhoto();
        }
      };

      window.addEventListener('resize', resizeHandler);
      window.addEventListener('keydown', keydownHandler);

      _this._registerRemoveEvent(window, 'resize', resizeHandler);

      _this._registerRemoveEvent(window, 'keydown', keydownHandler);

      return _possibleConstructorReturn(_this);
    }

    var orientationChangeHandler = function orientationChangeHandler() {
      if (!_this.groupItems()) {
        return;
      } // 画像の配置をリセット


      _this._resetTranslate();

      _this._setPosByCurrentIndex();

      _this._setHashByCurrentIndex();

      _this._setSizeByScreen();

      _this.update(); // orientationchangeが発火するタイミングとwindowのサイズが変化するタイミングが違うデバイスが存在する
      // その対策として、一定時間待機し、windowのサイズが変化しないかどうか確かめる
      // 変化した場合、もう一度画像の配置をリセットする


      var prevWidth = _this._getWindowWidth(); // 現在の画面サイズ


      var timeout = 500; // 最大待機時間

      var photoResizeAfterWindowSizeChange = function photoResizeAfterWindowSizeChange(time) {
        new Promise(function (resolve) {
          // 5ms秒待機
          setTimeout(function () {
            resolve();
          }, 25);
        }).then(function () {
          if (prevWidth !== _this._getWindowWidth()) {
            // windowのサイズが変化したら、画像の配置をリセット
            _this._resetTranslate();

            _this._setPosByCurrentIndex();

            _this._setHashByCurrentIndex();

            _this._setSizeByScreen();

            _this.update();
          } else if (time <= timeout) {
            // 待機時間内であれば再待機
            photoResizeAfterWindowSizeChange(time + 25);
          }
        });
      };

      photoResizeAfterWindowSizeChange(0); // 待機開始
    };

    window.addEventListener('orientationchange', orientationChangeHandler);

    _this._registerRemoveEvent(window, 'orientationchange', orientationChangeHandler);

    if (!_this.data.useOrientationApi) {
      return _possibleConstructorReturn(_this);
    }

    var deviceorientationHandler = function deviceorientationHandler(e) {
      var _window = window,
          orientation = _window.orientation;

      if (!e || !e.gamma || _this.data.appearEffect) {
        return;
      }

      if (!_this.isBeingZoomed && !_this.photoSwipable && !_this.data.elastic && _this.data.scale) {
        if (orientation === 0) {
          _this._calcGravity(e.gamma, e.beta);
        } else if (orientation === 90) {
          _this._calcGravity(e.beta, e.gamma);
        } else if (orientation === -90) {
          _this._calcGravity(-e.beta, -e.gamma);
        } else if (orientation === 180) {
          _this._calcGravity(-e.gamma, -e.beta);
        }
      }
    };

    window.addEventListener('deviceorientation', deviceorientationHandler);

    _this._registerRemoveEvent(window, 'deviceorientation', deviceorientationHandler);

    return _this;
  }