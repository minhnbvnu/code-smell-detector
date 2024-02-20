function Touchable() {
	        (0, _classCallCheck3['default'])(this, Touchable);

	        var _this = (0, _possibleConstructorReturn3['default'])(this, (Touchable.__proto__ || Object.getPrototypeOf(Touchable)).apply(this, arguments));

	        _this.state = {
	            active: false
	        };
	        _this.onTouchStart = function (e) {
	            _this.callChildEvent('onTouchStart', e);
	            _this.lockMouse = true;
	            if (_this.releaseLockTimer) {
	                clearTimeout(_this.releaseLockTimer);
	            }
	            _this.touchableHandleResponderGrant(e.nativeEvent);
	        };
	        _this.onTouchMove = function (e) {
	            _this.callChildEvent('onTouchMove', e);
	            _this.touchableHandleResponderMove(e.nativeEvent);
	        };
	        _this.onTouchEnd = function (e) {
	            _this.callChildEvent('onTouchEnd', e);
	            _this.releaseLockTimer = setTimeout(function () {
	                _this.lockMouse = false;
	            }, 300);
	            _this.touchableHandleResponderRelease(new _PressEvent2['default'](e.nativeEvent));
	        };
	        _this.onTouchCancel = function (e) {
	            _this.callChildEvent('onTouchCancel', e);
	            _this.releaseLockTimer = setTimeout(function () {
	                _this.lockMouse = false;
	            }, 300);
	            _this.touchableHandleResponderTerminate(e.nativeEvent);
	        };
	        _this.onMouseDown = function (e) {
	            _this.callChildEvent('onMouseDown', e);
	            if (_this.lockMouse) {
	                return;
	            }
	            _this.touchableHandleResponderGrant(e.nativeEvent);
	            document.addEventListener('mousemove', _this.touchableHandleResponderMove, false);
	            document.addEventListener('mouseup', _this.onMouseUp, false);
	        };
	        _this.onMouseUp = function (e) {
	            document.removeEventListener('mousemove', _this.touchableHandleResponderMove, false);
	            document.removeEventListener('mouseup', _this.onMouseUp, false);
	            _this.touchableHandleResponderRelease(new _PressEvent2['default'](e));
	        };
	        _this.touchableHandleResponderMove = function (e) {
	            if (!_this.touchable.startMouse) {
	                return;
	            }
	            // Measurement may not have returned yet.
	            if (!_this.touchable.dimensionsOnActivate || _this.touchable.touchState === States.NOT_RESPONDER) {
	                return;
	            }
	            // Not enough time elapsed yet, wait for highlight -
	            // this is just a perf optimization.
	            if (_this.touchable.touchState === States.RESPONDER_INACTIVE_PRESS_IN) {
	                return;
	            }
	            var touch = extractSingleTouch(e);
	            var pageX = touch && touch.pageX;
	            var pageY = touch && touch.pageY;
	            if (_this.pressInLocation) {
	                var movedDistance = _this._getDistanceBetweenPoints(pageX, pageY, _this.pressInLocation.pageX, _this.pressInLocation.pageY);
	                if (movedDistance > LONG_PRESS_ALLOWED_MOVEMENT) {
	                    _this._cancelLongPressDelayTimeout();
	                }
	            }
	            if (_this.checkTouchWithinActive(e)) {
	                _this._receiveSignal(Signals.ENTER_PRESS_RECT, e);
	                var curState = _this.touchable.touchState;
	                if (curState === States.RESPONDER_INACTIVE_PRESS_IN) {
	                    _this._cancelLongPressDelayTimeout();
	                }
	            } else {
	                _this._cancelLongPressDelayTimeout();
	                _this._receiveSignal(Signals.LEAVE_PRESS_RECT, e);
	            }
	        };
	        return _this;
	    }