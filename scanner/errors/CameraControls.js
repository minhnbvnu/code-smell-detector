                var dragging_1 = function () {
                    if (!_this._enabled)
                        return;
                    extractClientCoordFromEvent(_this._activePointers, _v2);
                    var deltaX = lastDragPosition_1.x - _v2.x;
                    var deltaY = lastDragPosition_1.y - _v2.y;
                    lastDragPosition_1.copy(_v2);
                    switch (_this._state) {
                        case ACTION.ROTATE:
                        case ACTION.TOUCH_ROTATE: {
                            _this._rotateInternal(deltaX, deltaY);
                            break;
                        }
                        case ACTION.DOLLY:
                        case ACTION.ZOOM: {
                            var dollyX = _this.dollyToCursor ? (dragStartPosition_1.x - _this._elementRect.x) / _this._elementRect.z * 2 - 1 : 0;
                            var dollyY = _this.dollyToCursor ? (dragStartPosition_1.y - _this._elementRect.y) / _this._elementRect.w * -2 + 1 : 0;
                            _this._state === ACTION.DOLLY ?
                                _this._dollyInternal(deltaY * TOUCH_DOLLY_FACTOR, dollyX, dollyY) :
                                _this._zoomInternal(deltaY * TOUCH_DOLLY_FACTOR, dollyX, dollyY);
                            break;
                        }
                        case ACTION.TOUCH_DOLLY:
                        case ACTION.TOUCH_ZOOM:
                        case ACTION.TOUCH_DOLLY_TRUCK:
                        case ACTION.TOUCH_ZOOM_TRUCK:
                        case ACTION.TOUCH_DOLLY_OFFSET:
                        case ACTION.TOUCH_ZOOM_OFFSET: {
                            var dx = _v2.x - _this._activePointers[1].clientX;
                            var dy = _v2.y - _this._activePointers[1].clientY;
                            var distance = Math.sqrt(dx * dx + dy * dy);
                            var dollyDelta = dollyStart_1.y - distance;
                            dollyStart_1.set(0, distance);
                            var dollyX = _this.dollyToCursor ? (lastDragPosition_1.x - _this._elementRect.x) / _this._elementRect.z * 2 - 1 : 0;
                            var dollyY = _this.dollyToCursor ? (lastDragPosition_1.y - _this._elementRect.y) / _this._elementRect.w * -2 + 1 : 0;
                            _this._state === ACTION.TOUCH_DOLLY ||
                                _this._state === ACTION.TOUCH_DOLLY_TRUCK ||
                                _this._state === ACTION.TOUCH_DOLLY_OFFSET ?
                                _this._dollyInternal(dollyDelta * TOUCH_DOLLY_FACTOR, dollyX, dollyY) :
                                _this._zoomInternal(dollyDelta * TOUCH_DOLLY_FACTOR, dollyX, dollyY);
                            if (_this._state === ACTION.TOUCH_DOLLY_TRUCK ||
                                _this._state === ACTION.TOUCH_ZOOM_TRUCK) {
                                _this._truckInternal(deltaX, deltaY, false);
                            }
                            else if (_this._state === ACTION.TOUCH_DOLLY_OFFSET ||
                                _this._state === ACTION.TOUCH_ZOOM_OFFSET) {
                                _this._truckInternal(deltaX, deltaY, true);
                            }
                            break;
                        }
                        case ACTION.TRUCK:
                        case ACTION.TOUCH_TRUCK: {
                            _this._truckInternal(deltaX, deltaY, false);
                            break;
                        }
                        case ACTION.OFFSET:
                        case ACTION.TOUCH_OFFSET: {
                            _this._truckInternal(deltaX, deltaY, true);
                            break;
                        }
                    }
                    _this.dispatchEvent({ type: 'control' });
                };