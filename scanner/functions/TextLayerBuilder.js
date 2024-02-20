function TextLayerBuilder(_ref) {
			var textLayerDiv = _ref.textLayerDiv;
			var eventBus = _ref.eventBus;
			var pageIndex = _ref.pageIndex;
			var viewport = _ref.viewport;
			var _ref$findController = _ref.findController;
			var findController = _ref$findController === undefined ? null : _ref$findController;
			var _ref$enhanceTextSelec = _ref.enhanceTextSelection;
			var enhanceTextSelection = _ref$enhanceTextSelec === undefined ? false : _ref$enhanceTextSelec;

			_classCallCheck(this, TextLayerBuilder);

			this.textLayerDiv = textLayerDiv;
			this.eventBus = eventBus;
			this.textContent = null;
			this.textContentItemsStr = [];
			this.textContentStream = null;
			this.renderingDone = false;
			this.pageIdx = pageIndex;
			this.pageNumber = this.pageIdx + 1;
			this.matches = [];
			this.viewport = viewport;
			this.textDivs = [];
			this.findController = findController;
			this.textLayerRenderTask = null;
			this.enhanceTextSelection = enhanceTextSelection;

			this._onUpdateTextLayerMatches = null;
			this._bindMouse();
		}