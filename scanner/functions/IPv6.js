function IPv6(emitter) {
    this.emitter = emitter;
    this.version = undefined;
    this.trafficClass = undefined;
    this.flowLabel = undefined;
    this.payloadLength = undefined;
    this.nextHeader = undefined;
    this.hopLimit = undefined;
    this.saddr = undefined;
    this.daddr = undefined;
    this.payload = undefined;
}