function TCP(emitter) {
    this.emitter        = emitter;
    this.sport          = undefined;
    this.dport          = undefined;
    this.seqno          = undefined;
    this.ackno          = undefined;
    this.headerLength   = undefined;
    this.reserved       = undefined;
    this.flags          = undefined;
    this.windowSize     = undefined;
    this.checksum       = undefined;
    this.urgentPointer  = undefined;
    this.options        = undefined;
    this.data           = undefined;
    this.dataLength     = undefined;
}