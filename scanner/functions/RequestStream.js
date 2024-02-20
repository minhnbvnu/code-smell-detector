function RequestStream(options) {
    this._pending = {};
    this.readable = true;
    this.writeable = true;
    this.options = _.defaults(options || {}, defaults);
}