function PcapPacket(emitter) {
    this.link_type = null;
    this.pcap_header = null;
    this.payload = null;
    this.emitter = emitter;
}