function Surface(surfaceManager, doc, editor, options) {
  Substance.EventEmitter.call(this);

  if (!doc) {
    throw new Error('Illegal argument: document is required. was ' + doc);
  }

  options = options || {};

  this.__id__ = __id__++;
  this.name = options.name || this.__id__;
  this.doc = doc;
  this.surfaceManager = surfaceManager;

  this.selection = Document.nullSelection;

  // this.element must be set via surface.attach(element)
  this.element = null;
  this.$element = null;
  this.editor = editor;

  this.surfaceSelection = null;

  this.logger = options.logger || window.console;

  // TODO: VE make jquery injectable
  this.$ = $;
  this.$window = this.$( window );
  this.$document = this.$( window.document );

  this.dragging = false;

  this._onMouseUp = _.bind( this.onMouseUp, this );
  this._onMouseDown = _.bind( this.onMouseDown, this );
  this._onMouseMove = _.bind( this.onMouseMove, this );

  this._onKeyDown = _.bind(this.onKeyDown, this);
  this._onTextInput = _.bind(this.onTextInput, this);
  this._onTextInputShim = _.bind( this.onTextInputShim, this );
  this._onCompositionStart = _.bind( this.onCompositionStart, this );

  this._onDomMutations = _.bind(this.onDomMutations, this);
  this.domObserver = new window.MutationObserver(this._onDomMutations);
  this.domObserverConfig = { subtree: true, characterData: true };
  this.skipNextObservation = false;

  // set when editing is enabled
  this.enabled = true;

  // surface usually gets frozen while showing a popup
  this.frozen = false;
  this.$caret = $('<span>').addClass('surface-caret');

  this.isIE = Surface.detectIE();
  this.isFF = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  this.undoEnabled = true;

  /*jshint eqnull:true */
  if (options.undoEnabled != null) {
    this.undoEnabled = options.undoEnabled;
  }
  if (options.contentEditable != null) {
    this.enableContentEditable = options.contentEditable;
  } else {
    this.enableContentEditable = true;
  }

  this.surfaceManager.registerSurface(this);
  /*jshint eqnull:false */
}