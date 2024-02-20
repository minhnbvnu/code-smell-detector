function RemoveFileError(originalError) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, "Failed to cleanup temporary file") || this;
        _this.originalError = originalError;
        var proto = _newTarget.prototype;
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(_this, proto);
        }
        else {
            _this.__proto__ = _newTarget.prototype;
        }
        return _this;
    }