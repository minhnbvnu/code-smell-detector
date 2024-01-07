constructor(type, message, options = {}) {
    this.type = type;
    this.message = message;
    this.options = options;
    this.emitter = new Emitter();
    this.timestamp = new Date();
    this.dismissed = true;
    if (this.isDismissable()) this.dismissed = false;
    this.displayed = false;
    this.validate();
  }