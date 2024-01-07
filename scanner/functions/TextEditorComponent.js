constructor(props) {
    this.props = props;

    if (!props.model) {
      props.model = new TextEditor({
        mini: props.mini,
        readOnly: props.readOnly
      });
    }
    this.props.model.component = this;

    if (props.element) {
      this.element = props.element;
    } else {
      if (!TextEditorElement)
        TextEditorElement = require('./text-editor-element');
      this.element = TextEditorElement.createTextEditorElement();
    }
    this.element.initialize(this);
    this.virtualNode = $('atom-text-editor');
    this.virtualNode.domNode = this.element;
    this.refs = {};

    this.updateSync = this.updateSync.bind(this);
    this.didBlurHiddenInput = this.didBlurHiddenInput.bind(this);
    this.didFocusHiddenInput = this.didFocusHiddenInput.bind(this);
    this.didPaste = this.didPaste.bind(this);
    this.didTextInput = this.didTextInput.bind(this);
    this.didKeydown = this.didKeydown.bind(this);
    this.didKeyup = this.didKeyup.bind(this);
    this.didKeypress = this.didKeypress.bind(this);
    this.didCompositionStart = this.didCompositionStart.bind(this);
    this.didCompositionUpdate = this.didCompositionUpdate.bind(this);
    this.didCompositionEnd = this.didCompositionEnd.bind(this);

    this.updatedSynchronously = this.props.updatedSynchronously;
    this.didScrollDummyScrollbar = this.didScrollDummyScrollbar.bind(this);
    this.didMouseDownOnContent = this.didMouseDownOnContent.bind(this);
    this.debouncedResumeCursorBlinking = debounce(
      this.resumeCursorBlinking.bind(this),
      this.props.cursorBlinkResumeDelay || CURSOR_BLINK_RESUME_DELAY
    );
    this.lineTopIndex = new LineTopIndex();
    this.lineNodesPool = new NodePool();
    this.updateScheduled = false;
    this.suppressUpdates = false;
    this.hasInitialMeasurements = false;
    this.measurements = {
      lineHeight: 0,
      baseCharacterWidth: 0,
      doubleWidthCharacterWidth: 0,
      halfWidthCharacterWidth: 0,
      koreanCharacterWidth: 0,
      gutterContainerWidth: 0,
      lineNumberGutterWidth: 0,
      clientContainerHeight: 0,
      clientContainerWidth: 0,
      verticalScrollbarWidth: 0,
      horizontalScrollbarHeight: 0,
      longestLineWidth: 0
    };
    this.derivedDimensionsCache = {};
    this.visible = false;
    this.cursorsBlinking = false;
    this.cursorsBlinkedOff = false;
    this.nextUpdateOnlyBlinksCursors = null;
    this.linesToMeasure = new Map();
    this.extraRenderedScreenLines = new Map();
    this.horizontalPositionsToMeasure = new Map(); // Keys are rows with positions we want to measure, values are arrays of columns to measure
    this.horizontalPixelPositionsByScreenLineId = new Map(); // Values are maps from column to horizontal pixel positions
    this.blockDecorationsToMeasure = new Set();
    this.blockDecorationsByElement = new WeakMap();
    this.blockDecorationSentinel = document.createElement('div');
    this.blockDecorationSentinel.style.height = '1px';
    this.heightsByBlockDecoration = new WeakMap();
    this.blockDecorationResizeObserver = new ResizeObserver(
      this.didResizeBlockDecorations.bind(this)
    );
    this.lineComponentsByScreenLineId = new Map();
    this.overlayComponents = new Set();
    this.shouldRenderDummyScrollbars = true;
    this.remeasureScrollbars = false;
    this.pendingAutoscroll = null;
    this.scrollTopPending = false;
    this.scrollLeftPending = false;
    this.scrollTop = 0;
    this.scrollLeft = 0;
    this.previousScrollWidth = 0;
    this.previousScrollHeight = 0;
    this.lastKeydown = null;
    this.lastKeydownBeforeKeypress = null;
    this.accentedCharacterMenuIsOpen = false;
    this.remeasureGutterDimensions = false;
    this.guttersToRender = [this.props.model.getLineNumberGutter()];
    this.guttersVisibility = [this.guttersToRender[0].visible];
    this.idsByTileStartRow = new Map();
    this.nextTileId = 0;
    this.renderedTileStartRows = [];
    this.showLineNumbers = this.props.model.doesShowLineNumbers();
    this.lineNumbersToRender = {
      maxDigits: 2,
      bufferRows: [],
      screenRows: [],
      keys: [],
      softWrappedFlags: [],
      foldableFlags: []
    };
    this.decorationsToRender = {
      lineNumbers: new Map(),
      lines: null,
      highlights: [],
      cursors: [],
      overlays: [],
      customGutter: new Map(),
      blocks: new Map(),
      text: []
    };
    this.decorationsToMeasure = {
      highlights: [],
      cursors: new Map()
    };
    this.textDecorationsByMarker = new Map();
    this.textDecorationBoundaries = [];
    this.pendingScrollTopRow = this.props.initialScrollTopRow;
    this.pendingScrollLeftColumn = this.props.initialScrollLeftColumn;
    this.tabIndex =
      this.props.element && this.props.element.tabIndex
        ? this.props.element.tabIndex
        : -1;

    this.measuredContent = false;
    this.queryGuttersToRender();
    this.queryMaxLineNumberDigits();
    this.observeBlockDecorations();
    this.updateClassList();
    etch.updateSync(this);
  }