function DNS(emitter) {
    this.emitter = emitter;
    this.header = undefined;
    this.question = undefined;
    this.answer = undefined;
    this.authority = undefined;
    this.additional = undefined;
    this._error = undefined;
}