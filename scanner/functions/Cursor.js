constructor(params) {
    super(params);
    this.editor = params.editor;
    this.marker = params.marker;
    this.emitter = new Emitter();
  }