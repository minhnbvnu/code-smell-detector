function EthernetPacket(emitter) {
    this.emitter = emitter;
    this.dhost = null;
    this.shost = null;
    this.ethertype = null;
    this.vlan = null;
    this.payload = null;
}