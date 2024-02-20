function InferredElementDragging(containerEl) {
            var _this = _super.call(this, containerEl) || this;
            _this.shouldIgnoreMove = false;
            _this.mirrorSelector = '';
            _this.currentMirrorEl = null;
            _this.handlePointerDown = function (ev) {
                _this.emitter.trigger('pointerdown', ev);
                if (!_this.shouldIgnoreMove) {
                    // fire dragstart right away. does not support delay or min-distance
                    _this.emitter.trigger('dragstart', ev);
                }
            };
            _this.handlePointerMove = function (ev) {
                if (!_this.shouldIgnoreMove) {
                    _this.emitter.trigger('dragmove', ev);
                }
            };
            _this.handlePointerUp = function (ev) {
                _this.emitter.trigger('pointerup', ev);
                if (!_this.shouldIgnoreMove) {
                    // fire dragend right away. does not support a revert animation
                    _this.emitter.trigger('dragend', ev);
                }
            };
            var pointer = _this.pointer = new PointerDragging(containerEl);
            pointer.emitter.on('pointerdown', _this.handlePointerDown);
            pointer.emitter.on('pointermove', _this.handlePointerMove);
            pointer.emitter.on('pointerup', _this.handlePointerUp);
            return _this;
        }