function DayTile(el) {
            var _this = _super.call(this, el) || this;
            var eventRenderer = _this.eventRenderer = new DayTileEventRenderer(_this);
            var renderFrame = _this.renderFrame = core.memoizeRendering(_this._renderFrame);
            _this.renderFgEvents = core.memoizeRendering(eventRenderer.renderSegs.bind(eventRenderer), eventRenderer.unrender.bind(eventRenderer), [renderFrame]);
            _this.renderEventSelection = core.memoizeRendering(eventRenderer.selectByInstanceId.bind(eventRenderer), eventRenderer.unselectByInstanceId.bind(eventRenderer), [_this.renderFgEvents]);
            _this.renderEventDrag = core.memoizeRendering(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
            _this.renderEventResize = core.memoizeRendering(eventRenderer.hideByHash.bind(eventRenderer), eventRenderer.showByHash.bind(eventRenderer), [renderFrame]);
            return _this;
        }