constructor({ cursor, marker, editor, id }) {
    this.id = id != null ? id : nextId++;
    this.cursor = cursor;
    this.marker = marker;
    this.editor = editor;
    this.emitter = new Emitter();
    this.initialScreenRange = null;
    this.wordwise = false;
    this.cursor.selection = this;
    this.decoration = this.editor.decorateMarker(this.marker, {
      type: 'highlight',
      class: 'selection'
    });
    this.marker.onDidChange(e => this.markerDidChange(e));
    this.marker.onDidDestroy(() => this.markerDidDestroy());
  }