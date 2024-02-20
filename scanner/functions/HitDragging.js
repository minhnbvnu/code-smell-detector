function HitDragging(dragging, droppableStore) {
            var _this = this;
            // options that can be set by caller
            this.useSubjectCenter = false;
            this.requireInitial = true; // if doesn't start out on a hit, won't emit any events
            this.initialHit = null;
            this.movingHit = null;
            this.finalHit = null; // won't ever be populated if shouldIgnoreMove
            this.handlePointerDown = function (ev) {
                var dragging = _this.dragging;
                _this.initialHit = null;
                _this.movingHit = null;
                _this.finalHit = null;
                _this.prepareHits();
                _this.processFirstCoord(ev);
                if (_this.initialHit || !_this.requireInitial) {
                    dragging.setIgnoreMove(false);
                    _this.emitter.trigger('pointerdown', ev); // TODO: fire this before computing processFirstCoord, so listeners can cancel. this gets fired by almost every handler :(
                }
                else {
                    dragging.setIgnoreMove(true);
                }
            };
            this.handleDragStart = function (ev) {
                _this.emitter.trigger('dragstart', ev);
                _this.handleMove(ev, true); // force = fire even if initially null
            };
            this.handleDragMove = function (ev) {
                _this.emitter.trigger('dragmove', ev);
                _this.handleMove(ev);
            };
            this.handlePointerUp = function (ev) {
                _this.releaseHits();
                _this.emitter.trigger('pointerup', ev);
            };
            this.handleDragEnd = function (ev) {
                if (_this.movingHit) {
                    _this.emitter.trigger('hitupdate', null, true, ev);
                }
                _this.finalHit = _this.movingHit;
                _this.movingHit = null;
                _this.emitter.trigger('dragend', ev);
            };
            this.droppableStore = droppableStore;
            dragging.emitter.on('pointerdown', this.handlePointerDown);
            dragging.emitter.on('dragstart', this.handleDragStart);
            dragging.emitter.on('dragmove', this.handleDragMove);
            dragging.emitter.on('pointerup', this.handlePointerUp);
            dragging.emitter.on('dragend', this.handleDragEnd);
            this.dragging = dragging;
            this.emitter = new core.EmitterMixin();
        }