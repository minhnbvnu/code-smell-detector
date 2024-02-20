function PcapHeader(raw_header) {
    this.tv_sec = raw_header.readUInt32LE(0, true);
    this.tv_usec = raw_header.readUInt32LE(4, true);
    this.caplen = raw_header.readUInt32LE(8, true);
    this.len = raw_header.readUInt32LE(12, true);
}