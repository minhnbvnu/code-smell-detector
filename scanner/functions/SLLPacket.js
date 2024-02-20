function SLLPacket (emitter) {
    this.emitter = emitter;
    this.packet_type = null;
    this.address_type = null;
    this.address_len = null;
    this.address = null;
    this.ethertype = null;
    this.payload = null;
}