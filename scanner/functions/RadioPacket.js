function RadioPacket(emitter) {
    this.emitter = emitter;
    this.headerRevision = undefined;
    this.headerPad = undefined;
    this.headerLength = undefined;
    this.presentFields = undefined;
    this.fields = undefined;
    this._decoderCache = {};
}