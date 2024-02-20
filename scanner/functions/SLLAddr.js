function SLLAddr(raw_packet, offset, len) {
	this.addr = new Array(len);
    for (var i = 0; i < len; i++) {
    	this.addr[i] = raw_packet[offset + i];
    }
}