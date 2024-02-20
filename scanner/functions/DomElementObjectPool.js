function DomElementObjectPool(type) {
        this.type = type;
        this._type = type;
        this._pool = [];
        this._inUse = {};
    }