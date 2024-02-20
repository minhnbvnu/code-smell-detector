function PacketWithHeader(buf, header, link_type) {
    this.buf = buf;
    this.header = header;
    this.link_type = link_type;
}