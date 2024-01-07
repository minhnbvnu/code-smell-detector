constructor() {
    this.destroy = this.destroy.bind(this);
    this.emitter = new Emitter();
    this.disposables = new CompositeDisposable();
    this.entities = []; // Used for specs
  }