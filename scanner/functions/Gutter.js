constructor(gutterContainer, options) {
    this.gutterContainer = gutterContainer;
    this.name = options && options.name;
    this.priority =
      options && options.priority != null ? options.priority : DefaultPriority;
    this.visible = options && options.visible != null ? options.visible : true;
    this.type = options && options.type != null ? options.type : 'decorated';
    this.labelFn = options && options.labelFn;
    this.className = options && options.class;

    this.onMouseDown = options && options.onMouseDown;
    this.onMouseMove = options && options.onMouseMove;

    this.emitter = new Emitter();
  }