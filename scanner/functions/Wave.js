function Wave() {
    var _this;
    wave_classCallCheck(this, Wave);
    _this = _super.apply(this, arguments);
    _this.animationStart = false;
    _this.destroy = false;
    _this.onClick = function (node, waveColor) {
      if (!node || isHidden(node) || node.className.indexOf('-leave') >= 0) {
        return;
      }
      var insertExtraNode = _this.props.insertExtraNode;
      _this.extraNode = document.createElement('div');
      var _assertThisInitialize = wave_assertThisInitialized(_this),
        extraNode = _assertThisInitialize.extraNode;
      extraNode.className = 'ant-click-animating-node';
      var attributeName = _this.getAttributeName();
      node.setAttribute(attributeName, 'true'); // Not white or transparnt or grey

      styleForPesudo = styleForPesudo || document.createElement('style');
      if (waveColor && waveColor !== '#ffffff' && waveColor !== 'rgb(255, 255, 255)' && isNotGrey(waveColor) && !/rgba\(\d*, \d*, \d*, 0\)/.test(waveColor) &&
      // any transparent rgba color
      waveColor !== 'transparent') {
        // Add nonce if CSP exist
        if (_this.csp && _this.csp.nonce) {
          styleForPesudo.nonce = _this.csp.nonce;
        }
        extraNode.style.borderColor = waveColor;
        styleForPesudo.innerHTML = "\n      [ant-click-animating-without-extra-node='true']::after, .ant-click-animating-node {\n        --antd-wave-shadow-color: ".concat(waveColor, ";\n      }");
        if (!document.body.contains(styleForPesudo)) {
          document.body.appendChild(styleForPesudo);
        }
      }
      if (insertExtraNode) {
        node.appendChild(extraNode);
      }
      Event.addStartEventListener(node, _this.onTransitionStart);
      Event.addEndEventListener(node, _this.onTransitionEnd);
    };
    _this.onTransitionStart = function (e) {
      if (_this.destroy) return;
      var node = Object(external_window_ReactDOM_["findDOMNode"])(wave_assertThisInitialized(_this));
      if (!e || e.target !== node) {
        return;
      }
      if (!_this.animationStart) {
        _this.resetEffect(node);
      }
    };
    _this.onTransitionEnd = function (e) {
      if (!e || e.animationName !== 'fadeEffect') {
        return;
      }
      _this.resetEffect(e.target);
    };
    _this.bindAnimationEvent = function (node) {
      if (!node || !node.getAttribute || node.getAttribute('disabled') || node.className.indexOf('disabled') >= 0) {
        return;
      }
      var onClick = function onClick(e) {
        // Fix radio button click twice
        if (e.target.tagName === 'INPUT' || isHidden(e.target)) {
          return;
        }
        _this.resetEffect(node); // Get wave color from target

        var waveColor = getComputedStyle(node).getPropertyValue('border-top-color') ||
        // Firefox Compatible
        getComputedStyle(node).getPropertyValue('border-color') || getComputedStyle(node).getPropertyValue('background-color');
        _this.clickWaveTimeoutId = window.setTimeout(function () {
          return _this.onClick(node, waveColor);
        }, 0);
        wrapperRaf.cancel(_this.animationStartId);
        _this.animationStart = true; // Render to trigger transition event cost 3 frames. Let's delay 10 frames to reset this.

        _this.animationStartId = wrapperRaf(function () {
          _this.animationStart = false;
        }, 10);
      };
      node.addEventListener('click', onClick, true);
      return {
        cancel: function cancel() {
          node.removeEventListener('click', onClick, true);
        }
      };
    };
    _this.renderWave = function (_ref) {
      var csp = _ref.csp;
      var children = _this.props.children;
      _this.csp = csp;
      return children;
    };
    return _this;
  }