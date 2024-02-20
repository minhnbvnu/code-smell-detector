function IPv4(emitter) {
    this.emitter = emitter; 
    this.version = undefined;
    this.headerLength = undefined;
    this.diffserv = undefined;
    this.length = undefined;
    this.identification = undefined;
    this.flags = undefined;
    this.fragmentOffset = undefined;
    this.ttl = undefined;
    this.protocol = undefined;
    this.headerChecksum = undefined;
    this.saddr = undefined;
    this.daddr = undefined;
    this.protocolName = undefined;
    this.payload = undefined;
}