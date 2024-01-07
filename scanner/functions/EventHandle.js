constructor(handler, name, callback, scope, once = false) {
        this.handler = handler;
        this.name = name;
        this.callback = callback;
        this.scope = scope;
        this._once = once;
    }