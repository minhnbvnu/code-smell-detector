function MockDriver(o) {
        this.options = o;
        EventEmitter.call(this);
        this._containers = {};
      }