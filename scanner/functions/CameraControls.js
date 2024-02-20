function CameraControls(camera, domElement) {
            var _this = _super.call(this) || this;
            _this.minPolarAngle = 0;
            _this.maxPolarAngle = Math.PI;
            _this.minAzimuthAngle = -Infinity;
            _this.maxAzimuthAngle = Infinity;
            _this.minDistance = 0;
            _this.maxDistance = Infinity;
            _this.infinityDolly = false;
            _this.minZoom = 0.01;
            _this.maxZoom = Infinity;
            _this.dampingFactor = 0.05;
            _this.draggingDampingFactor = 0.25;
            _this.azimuthRotateSpeed = 1.0;
            _this.polarRotateSpeed = 1.0;
            _this.dollySpeed = 1.0;
            _this.truckSpeed = 2.0;
            _this.dollyToCursor = false;
            _this.dragToOffset = false;
            _this.verticalDragToForward = false;
            _this.boundaryFriction = 0.0;
            _this.restThreshold = 0.01;
            _this.colliderMeshes = [];
            _this.cancel = function () { };
            _this._enabled = true;
            _this._state = ACTION.NONE;
            _this._viewport = null;
            _this._dollyControlAmount = 0;
            _this._hasRested = true;
            _this._boundaryEnclosesCamera = false;
            _this._needsUpdate = true;
            _this._updatedLastTime = false;
            _this._activePointers = [];
            _this._truckInternal = function (deltaX, deltaY, dragToOffset) {
                if (isPerspectiveCamera(_this._camera)) {
                    var offset = _v3A.copy(_this._camera.position).sub(_this._target);
                    var fov = _this._camera.getEffectiveFOV() * THREE.MathUtils.DEG2RAD;
                    var targetDistance = offset.length() * Math.tan(fov * 0.5);
                    var truckX = (_this.truckSpeed * deltaX * targetDistance / _this._elementRect.w);
                    var pedestalY = (_this.truckSpeed * deltaY * targetDistance / _this._elementRect.w);
                    if (_this.verticalDragToForward) {
                        dragToOffset ?
                            _this.setFocalOffset(_this._focalOffsetEnd.x + truckX, _this._focalOffsetEnd.y, _this._focalOffsetEnd.z, true) :
                            _this.truck(truckX, 0, true);
                        _this.forward(-pedestalY, true);
                    }
                    else {
                        dragToOffset ?
                            _this.setFocalOffset(_this._focalOffsetEnd.x + truckX, _this._focalOffsetEnd.y + pedestalY, _this._focalOffsetEnd.z, true) :
                            _this.truck(truckX, pedestalY, true);
                    }
                }
                else if (isOrthographicCamera(_this._camera)) {
                    var camera = _this._camera;
                    var truckX = deltaX * (camera.right - camera.left) / camera.zoom / _this._elementRect.z;
                    var pedestalY = deltaY * (camera.top - camera.bottom) / camera.zoom / _this._elementRect.w;
                    dragToOffset ?
                        _this.setFocalOffset(_this._focalOffsetEnd.x + truckX, _this._focalOffsetEnd.y + pedestalY, _this._focalOffsetEnd.z, true) :
                        _this.truck(truckX, pedestalY, true);
                }
            };
            _this._rotateInternal = function (deltaX, deltaY) {
                var theta = PI_2 * _this.azimuthRotateSpeed * deltaX / _this._elementRect.w;
                var phi = PI_2 * _this.polarRotateSpeed * deltaY / _this._elementRect.w;
                _this.rotate(theta, phi, true);
            };
            _this._dollyInternal = function (delta, x, y) {
                var dollyScale = Math.pow(0.95, -delta * _this.dollySpeed);
                var distance = _this._sphericalEnd.radius * dollyScale;
                var prevRadius = _this._sphericalEnd.radius;
                var signedPrevRadius = prevRadius * (delta >= 0 ? -1 : 1);
                _this.dollyTo(distance);
                if (_this.infinityDolly && (distance < _this.minDistance || _this.maxDistance === _this.minDistance)) {
                    _this._camera.getWorldDirection(_v3A);
                    _this._targetEnd.add(_v3A.normalize().multiplyScalar(signedPrevRadius));
                    _this._target.add(_v3A.normalize().multiplyScalar(signedPrevRadius));
                }
                if (_this.dollyToCursor) {
                    _this._dollyControlAmount += _this._sphericalEnd.radius - prevRadius;
                    if (_this.infinityDolly && (distance < _this.minDistance || _this.maxDistance === _this.minDistance)) {
                        _this._dollyControlAmount -= signedPrevRadius;
                    }
                    _this._dollyControlCoord.set(x, y);
                }
                return;
            };
            _this._zoomInternal = function (delta, x, y) {
                var zoomScale = Math.pow(0.95, delta * _this.dollySpeed);
                _this.zoomTo(_this._zoom * zoomScale);
                if (_this.dollyToCursor) {
                    _this._dollyControlAmount = _this._zoomEnd;
                    _this._dollyControlCoord.set(x, y);
                }
                return;
            };
            if (typeof THREE === 'undefined') {
                console.error('camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information.');
            }
            _this._camera = camera;
            _this._yAxisUpSpace = new THREE.Quaternion().setFromUnitVectors(_this._camera.up, _AXIS_Y);
            _this._yAxisUpSpaceInverse = quatInvertCompat(_this._yAxisUpSpace.clone());
            _this._state = ACTION.NONE;
            _this._domElement = domElement;
            _this._domElement.style.touchAction = 'none';
            _this._target = new THREE.Vector3();
            _this._targetEnd = _this._target.clone();
            _this._focalOffset = new THREE.Vector3();
            _this._focalOffsetEnd = _this._focalOffset.clone();
            _this._spherical = new THREE.Spherical().setFromVector3(_v3A.copy(_this._camera.position).applyQuaternion(_this._yAxisUpSpace));
            _this._sphericalEnd = _this._spherical.clone();
            _this._zoom = _this._camera.zoom;
            _this._zoomEnd = _this._zoom;
            _this._nearPlaneCorners = [
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
                new THREE.Vector3(),
            ];
            _this._updateNearPlaneCorners();
            _this._boundary = new THREE.Box3(new THREE.Vector3(-Infinity, -Infinity, -Infinity), new THREE.Vector3(Infinity, Infinity, Infinity));
            _this._target0 = _this._target.clone();
            _this._position0 = _this._camera.position.clone();
            _this._zoom0 = _this._zoom;
            _this._focalOffset0 = _this._focalOffset.clone();
            _this._dollyControlAmount = 0;
            _this._dollyControlCoord = new THREE.Vector2();
            _this.mouseButtons = {
                left: ACTION.ROTATE,
                middle: ACTION.DOLLY,
                right: ACTION.TRUCK,
                wheel: isPerspectiveCamera(_this._camera) ? ACTION.DOLLY :
                    isOrthographicCamera(_this._camera) ? ACTION.ZOOM :
                        ACTION.NONE,
                shiftLeft: ACTION.NONE,
            };
            _this.touches = {
                one: ACTION.TOUCH_ROTATE,
                two: isPerspectiveCamera(_this._camera) ? ACTION.TOUCH_DOLLY_TRUCK :
                    isOrthographicCamera(_this._camera) ? ACTION.TOUCH_ZOOM_TRUCK :
                        ACTION.NONE,
                three: ACTION.TOUCH_TRUCK,
            };
            _this._elementRect = new THREE.Vector4();
            if (_this._domElement) {
                var dragStartPosition_1 = new THREE.Vector2();
                var lastDragPosition_1 = new THREE.Vector2();
                var dollyStart_1 = new THREE.Vector2();
                var cancelDragging_1 = function () {
                    _this._state = ACTION.NONE;
                    _this._activePointers.length = 0;
                    endDragging_1();
                };
                var onPointerDown_1 = function (event) {
                    if (!_this._enabled)
                        return;
                    var pointer = {
                        pointerId: event.pointerId,
                        clientX: event.clientX,
                        clientY: event.clientY,
                    };
                    _this._activePointers.push(pointer);
                    switch (event.button) {
                        case THREE.MOUSE.LEFT:
                            _this._state = event.shiftKey ? _this.mouseButtons.shiftLeft : _this.mouseButtons.left;
                            break;
                        case THREE.MOUSE.MIDDLE:
                            _this._state = _this.mouseButtons.middle;
                            break;
                        case THREE.MOUSE.RIGHT:
                            _this._state = _this.mouseButtons.right;
                            break;
                    }
                    if (event.pointerType === 'touch') {
                        switch (_this._activePointers.length) {
                            case 1:
                                _this._state = _this.touches.one;
                                break;
                            case 2:
                                _this._state = _this.touches.two;
                                break;
                            case 3:
                                _this._state = _this.touches.three;
                                break;
                        }
                    }
                    _this._domElement.ownerDocument.removeEventListener('pointermove', onPointerMove_1, { passive: false });
                    _this._domElement.ownerDocument.removeEventListener('pointerup', onPointerUp_1);
                    _this._domElement.ownerDocument.addEventListener('pointermove', onPointerMove_1, { passive: false });
                    _this._domElement.ownerDocument.addEventListener('pointerup', onPointerUp_1);
                    startDragging_1();
                };
                var onMouseDown_1 = function (event) {
                    if (!_this._enabled)
                        return;
                    var pointer = {
                        pointerId: 0,
                        clientX: event.clientX,
                        clientY: event.clientY,
                    };
                    _this._activePointers.push(pointer);
                    switch (event.button) {
                        case THREE.MOUSE.LEFT:
                            _this._state = event.shiftKey ? _this.mouseButtons.shiftLeft : _this.mouseButtons.left;
                            break;
                        case THREE.MOUSE.MIDDLE:
                            _this._state = _this.mouseButtons.middle;
                            break;
                        case THREE.MOUSE.RIGHT:
                            _this._state = _this.mouseButtons.right;
                            break;
                    }
                    _this._domElement.ownerDocument.removeEventListener('mousemove', onMouseMove_1);
                    _this._domElement.ownerDocument.removeEventListener('mouseup', onMouseUp_1);
                    _this._domElement.ownerDocument.addEventListener('mousemove', onMouseMove_1);
                    _this._domElement.ownerDocument.addEventListener('mouseup', onMouseUp_1);
                    startDragging_1();
                };
                var onTouchStart_1 = function (event) {
                    if (!_this._enabled)
                        return;
                    event.preventDefault();
                    Array.prototype.forEach.call(event.changedTouches, function (touch) {
                        var pointer = {
                            pointerId: touch.identifier,
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                        };
                        _this._activePointers.push(pointer);
                    });
                    switch (_this._activePointers.length) {
                        case 1:
                            _this._state = _this.touches.one;
                            break;
                        case 2:
                            _this._state = _this.touches.two;
                            break;
                        case 3:
                            _this._state = _this.touches.three;
                            break;
                    }
                    _this._domElement.ownerDocument.removeEventListener('touchmove', onTouchMove_1, { passive: false });
                    _this._domElement.ownerDocument.removeEventListener('touchend', onTouchEnd_1);
                    _this._domElement.ownerDocument.addEventListener('touchmove', onTouchMove_1, { passive: false });
                    _this._domElement.ownerDocument.addEventListener('touchend', onTouchEnd_1);
                    startDragging_1();
                };
                var onPointerMove_1 = function (event) {
                    if (event.cancelable)
                        event.preventDefault();
                    var pointerId = event.pointerId;
                    var pointer = _this._findPointerById(pointerId);
                    if (!pointer)
                        return;
                    pointer.clientX = event.clientX;
                    pointer.clientY = event.clientY;
                    dragging_1();
                };
                var onMouseMove_1 = function (event) {
                    var pointer = _this._findPointerById(0);
                    if (!pointer)
                        return;
                    pointer.clientX = event.clientX;
                    pointer.clientY = event.clientY;
                    dragging_1();
                };
                var onTouchMove_1 = function (event) {
                    if (event.cancelable)
                        event.preventDefault();
                    Array.prototype.forEach.call(event.changedTouches, function (touch) {
                        var pointerId = touch.identifier;
                        var pointer = _this._findPointerById(pointerId);
                        if (!pointer)
                            return;
                        pointer.clientX = touch.clientX;
                        pointer.clientY = touch.clientY;
                    });
                    dragging_1();
                };
                var onPointerUp_1 = function (event) {
                    var pointerId = event.pointerId;
                    var pointer = _this._findPointerById(pointerId);
                    pointer && _this._activePointers.splice(_this._activePointers.indexOf(pointer), 1);
                    if (event.pointerType === 'touch') {
                        switch (_this._activePointers.length) {
                            case 0:
                                _this._state = ACTION.NONE;
                                break;
                            case 1:
                                _this._state = _this.touches.one;
                                break;
                            case 2:
                                _this._state = _this.touches.two;
                                break;
                            case 3:
                                _this._state = _this.touches.three;
                                break;
                        }
                    }
                    else {
                        _this._state = ACTION.NONE;
                    }
                    endDragging_1();
                };
                var onMouseUp_1 = function () {
                    var pointer = _this._findPointerById(0);
                    pointer && _this._activePointers.splice(_this._activePointers.indexOf(pointer), 1);
                    _this._state = ACTION.NONE;
                    endDragging_1();
                };
                var onTouchEnd_1 = function (event) {
                    Array.prototype.forEach.call(event.changedTouches, function (touch) {
                        var pointerId = touch.identifier;
                        var pointer = _this._findPointerById(pointerId);
                        pointer && _this._activePointers.splice(_this._activePointers.indexOf(pointer), 1);
                    });
                    switch (_this._activePointers.length) {
                        case 0:
                            _this._state = ACTION.NONE;
                            break;
                        case 1:
                            _this._state = _this.touches.one;
                            break;
                        case 2:
                            _this._state = _this.touches.two;
                            break;
                        case 3:
                            _this._state = _this.touches.three;
                            break;
                    }
                    endDragging_1();
                };
                var lastScrollTimeStamp_1 = -1;
                var onMouseWheel_1 = function (event) {
                    if (!_this._enabled || _this.mouseButtons.wheel === ACTION.NONE)
                        return;
                    event.preventDefault();
                    if (_this.dollyToCursor ||
                        _this.mouseButtons.wheel === ACTION.ROTATE ||
                        _this.mouseButtons.wheel === ACTION.TRUCK) {
                        var now = performance.now();
                        if (lastScrollTimeStamp_1 - now < 1000)
                            _this._getClientRect(_this._elementRect);
                        lastScrollTimeStamp_1 = now;
                    }
                    var deltaYFactor = isMac ? -1 : -3;
                    var delta = (event.deltaMode === 1) ? event.deltaY / deltaYFactor : event.deltaY / (deltaYFactor * 10);
                    var x = _this.dollyToCursor ? (event.clientX - _this._elementRect.x) / _this._elementRect.z * 2 - 1 : 0;
                    var y = _this.dollyToCursor ? (event.clientY - _this._elementRect.y) / _this._elementRect.w * -2 + 1 : 0;
                    switch (_this.mouseButtons.wheel) {
                        case ACTION.ROTATE: {
                            _this._rotateInternal(event.deltaX, event.deltaY);
                            break;
                        }
                        case ACTION.TRUCK: {
                            _this._truckInternal(event.deltaX, event.deltaY, false);
                            break;
                        }
                        case ACTION.OFFSET: {
                            _this._truckInternal(event.deltaX, event.deltaY, true);
                            break;
                        }
                        case ACTION.DOLLY: {
                            _this._dollyInternal(-delta, x, y);
                            break;
                        }
                        case ACTION.ZOOM: {
                            _this._zoomInternal(-delta, x, y);
                            break;
                        }
                    }
                    _this.dispatchEvent({ type: 'control' });
                };
                var onContextMenu_1 = function (event) {
                    if (!_this._enabled)
                        return;
                    event.preventDefault();
                };
                var startDragging_1 = function () {
                    if (!_this._enabled)
                        return;
                    extractClientCoordFromEvent(_this._activePointers, _v2);
                    _this._getClientRect(_this._elementRect);
                    dragStartPosition_1.copy(_v2);
                    lastDragPosition_1.copy(_v2);
                    var isMultiTouch = _this._activePointers.length >= 2;
                    if (isMultiTouch) {
                        var dx = _v2.x - _this._activePointers[1].clientX;
                        var dy = _v2.y - _this._activePointers[1].clientY;
                        var distance = Math.sqrt(dx * dx + dy * dy);
                        dollyStart_1.set(0, distance);
                        var x = (_this._activePointers[0].clientX + _this._activePointers[1].clientX) * 0.5;
                        var y = (_this._activePointers[0].clientY + _this._activePointers[1].clientY) * 0.5;
                        lastDragPosition_1.set(x, y);
                    }
                    _this.dispatchEvent({ type: 'controlstart' });
                };
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
                var endDragging_1 = function () {
                    extractClientCoordFromEvent(_this._activePointers, _v2);
                    lastDragPosition_1.copy(_v2);
                    if (_this._activePointers.length === 0) {
                        _this._domElement.ownerDocument.removeEventListener('pointermove', onPointerMove_1, { passive: false });
                        _this._domElement.ownerDocument.removeEventListener('pointerup', onPointerUp_1);
                        _this._domElement.ownerDocument.removeEventListener('touchmove', onTouchMove_1, { passive: false });
                        _this._domElement.ownerDocument.removeEventListener('touchend', onTouchEnd_1);
                    }
                    _this.dispatchEvent({ type: 'controlend' });
                };
                _this._domElement.addEventListener('pointerdown', onPointerDown_1);
                isPointerEventsNotSupported && _this._domElement.addEventListener('mousedown', onMouseDown_1);
                isPointerEventsNotSupported && _this._domElement.addEventListener('touchstart', onTouchStart_1);
                _this._domElement.addEventListener('pointercancel', onPointerUp_1);
                _this._domElement.addEventListener('wheel', onMouseWheel_1, { passive: false });
                _this._domElement.addEventListener('contextmenu', onContextMenu_1);
                _this._removeAllEventListeners = function () {
                    _this._domElement.removeEventListener('pointerdown', onPointerDown_1);
                    _this._domElement.removeEventListener('mousedown', onMouseDown_1);
                    _this._domElement.removeEventListener('touchstart', onTouchStart_1);
                    _this._domElement.removeEventListener('pointercancel', onPointerUp_1);
                    _this._domElement.removeEventListener('wheel', onMouseWheel_1, { passive: false });
                    _this._domElement.removeEventListener('contextmenu', onContextMenu_1);
                    _this._domElement.ownerDocument.removeEventListener('pointermove', onPointerMove_1, { passive: false });
                    _this._domElement.ownerDocument.removeEventListener('mousemove', onMouseMove_1);
                    _this._domElement.ownerDocument.removeEventListener('touchmove', onTouchMove_1, { passive: false });
                    _this._domElement.ownerDocument.removeEventListener('pointerup', onPointerUp_1);
                    _this._domElement.ownerDocument.removeEventListener('mouseup', onMouseUp_1);
                    _this._domElement.ownerDocument.removeEventListener('touchend', onTouchEnd_1);
                };
                _this.cancel = function () {
                    cancelDragging_1();
                    _this.dispatchEvent({ type: 'controlend' });
                };
            }
            _this.update(0);
            return _this;
        }