function EventHovering(settings) {
            var _this = _super.call(this, settings) || this;
            // for simulating an eventMouseLeave when the event el is destroyed while mouse is over it
            _this.handleEventElRemove = function (el) {
                if (el === _this.currentSegEl) {
                    _this.handleSegLeave(null, _this.currentSegEl);
                }
            };
            _this.handleSegEnter = function (ev, segEl) {
                if (getElSeg(segEl)) { // TODO: better way to make sure not hovering over more+ link or its wrapper
                    segEl.classList.add('fc-allow-mouse-resize');
                    _this.currentSegEl = segEl;
                    _this.triggerEvent('eventMouseEnter', ev, segEl);
                }
            };
            _this.handleSegLeave = function (ev, segEl) {
                if (_this.currentSegEl) {
                    segEl.classList.remove('fc-allow-mouse-resize');
                    _this.currentSegEl = null;
                    _this.triggerEvent('eventMouseLeave', ev, segEl);
                }
            };
            var component = settings.component;
            _this.removeHoverListeners = listenToHoverBySelector(component.el, component.fgSegSelector + ',' + component.bgSegSelector, _this.handleSegEnter, _this.handleSegLeave);
            // how to make sure component already has context?
            component.context.calendar.on('eventElRemove', _this.handleEventElRemove);
            return _this;
        }