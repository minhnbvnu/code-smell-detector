function InformedController() {
    _classCallCheck(this, InformedController);
    this.emitter = new Emitter();

    // Map will store all forms by name
    // Key => name
    // Val => fieldMetaRef
    // Why? so the form knows about field meta
    this.formMap = new Map();

    // For saving values
    this.savedValues = new Map();
    this.getController = this.getController.bind(this);
    this.register = this.register.bind(this);
    this.deregister = this.deregister.bind(this);
  }