function LogicalLinkControl(emitter) {
    this.emitter = emitter;
    this.dsap = undefined;
    this.ssap = undefined;
    this.controlField = undefined;
    this.orgCode = undefined;
    this.type = undefined;
    this._error = undefined;
}