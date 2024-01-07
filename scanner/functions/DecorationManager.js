constructor(editor) {
    this.editor = editor;
    this.displayLayer = this.editor.displayLayer;

    this.emitter = new Emitter();
    this.decorationCountsByLayer = new Map();
    this.markerDecorationCountsByLayer = new Map();
    this.decorationsByMarker = new Map();
    this.layerDecorationsByMarkerLayer = new Map();
    this.overlayDecorations = new Set();
    this.layerUpdateDisposablesByLayer = new WeakMap();
  }