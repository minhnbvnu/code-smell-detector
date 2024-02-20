function PointerDragging(containerEl) {
            var _this = this;
            this.subjectEl = null;
            this.downEl = null;
            // options that can be directly assigned by caller
            this.selector = ''; // will cause subjectEl in all emitted events to be this element
            this.handleSelector = '';
            this.shouldIgnoreMove = false;
            this.shouldWatchScroll = true; // for simulating pointermove on scroll
            // internal states
            this.isDragging = false;
            this.isTouchDragging = false;
            this.wasTouchScroll = false;
            // Mouse
            // ----------------------------------------------------------------------------------------------------
            this.handleMouseDown = function (ev) {
                if (!_this.shouldIgnoreMouse() &&
                    isPrimaryMouseButton(ev) &&
                    _this.tryStart(ev)) {
                    var pev = _this.createEventFromMouse(ev, true);
                    _this.emitter.trigger('pointerdown', pev);
                    _this.initScrollWatch(pev);
                    if (!_this.shouldIgnoreMove) {
                        document.addEventListener('mousemove', _this.handleMouseMove);
                    }
                    document.addEventListener('mouseup', _this.handleMouseUp);
                }
            };
            this.handleMouseMove = function (ev) {
                var pev = _this.createEventFromMouse(ev);
                _this.recordCoords(pev);
                _this.emitter.trigger('pointermove', pev);
            };
            this.handleMouseUp = function (ev) {
                document.removeEventListener('mousemove', _this.handleMouseMove);
                document.removeEventListener('mouseup', _this.handleMouseUp);
                _this.emitter.trigger('pointerup', _this.createEventFromMouse(ev));
                _this.cleanup(); // call last so that pointerup has access to props
            };
            // Touch
            // ----------------------------------------------------------------------------------------------------
            this.handleTouchStart = function (ev) {
                if (_this.tryStart(ev)) {
                    _this.isTouchDragging = true;
                    var pev = _this.createEventFromTouch(ev, true);
                    _this.emitter.trigger('pointerdown', pev);
                    _this.initScrollWatch(pev);
                    // unlike mouse, need to attach to target, not document
                    // https://stackoverflow.com/a/45760014
                    var target = ev.target;
                    if (!_this.shouldIgnoreMove) {
                        target.addEventListener('touchmove', _this.handleTouchMove);
                    }
                    target.addEventListener('touchend', _this.handleTouchEnd);
                    target.addEventListener('touchcancel', _this.handleTouchEnd); // treat it as a touch end
                    // attach a handler to get called when ANY scroll action happens on the page.
                    // this was impossible to do with normal on/off because 'scroll' doesn't bubble.
                    // http://stackoverflow.com/a/32954565/96342
                    window.addEventListener('scroll', _this.handleTouchScroll, true // useCapture
                    );
                }
            };
            this.handleTouchMove = function (ev) {
                var pev = _this.createEventFromTouch(ev);
                _this.recordCoords(pev);
                _this.emitter.trigger('pointermove', pev);
            };
            this.handleTouchEnd = function (ev) {
                if (_this.isDragging) { // done to guard against touchend followed by touchcancel
                    var target = ev.target;
                    target.removeEventListener('touchmove', _this.handleTouchMove);
                    target.removeEventListener('touchend', _this.handleTouchEnd);
                    target.removeEventListener('touchcancel', _this.handleTouchEnd);
                    window.removeEventListener('scroll', _this.handleTouchScroll, true); // useCaptured=true
                    _this.emitter.trigger('pointerup', _this.createEventFromTouch(ev));
                    _this.cleanup(); // call last so that pointerup has access to props
                    _this.isTouchDragging = false;
                    startIgnoringMouse();
                }
            };
            this.handleTouchScroll = function () {
                _this.wasTouchScroll = true;
            };
            this.handleScroll = function (ev) {
                if (!_this.shouldIgnoreMove) {
                    var pageX = (window.pageXOffset - _this.prevScrollX) + _this.prevPageX;
                    var pageY = (window.pageYOffset - _this.prevScrollY) + _this.prevPageY;
                    _this.emitter.trigger('pointermove', {
                        origEvent: ev,
                        isTouch: _this.isTouchDragging,
                        subjectEl: _this.subjectEl,
                        pageX: pageX,
                        pageY: pageY,
                        deltaX: pageX - _this.origPageX,
                        deltaY: pageY - _this.origPageY
                    });
                }
            };
            this.containerEl = containerEl;
            this.emitter = new core.EmitterMixin();
            containerEl.addEventListener('mousedown', this.handleMouseDown);
            containerEl.addEventListener('touchstart', this.handleTouchStart, { passive: true });
            listenerCreated();
        }