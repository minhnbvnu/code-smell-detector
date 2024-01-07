function _define(name) {
    Object.defineProperty(ElementComponent.prototype, name, {
        get: function () {
            if (this._text) {
                return this._text[name];
            } else if (this._image) {
                return this._image[name];
            }
            return null;
        },
        set: function (value) {
            if (this._text) {
                if (this._text[name] !== value) {
                    this._dirtyBatch();
                }

                this._text[name] = value;
            } else if (this._image) {
                if (this._image[name] !== value) {
                    this._dirtyBatch();
                }

                this._image[name] = value;
            }
        }
    });
}