function NullPacket(emitter) {
    this.emitter = emitter;
    this.pftype = undefined;
    this.payload = undefined;
    this._error = undefined;
}