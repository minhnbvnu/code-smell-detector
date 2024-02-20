function TCPSession() {
    this.src = null;
    this.src_name = null; // from DNS
    this.dst = null;
    this.dst_name = null; // from DNS

    this.state = null;
    this.current_cap_time = null;

    this.syn_time = null;
    this.missed_syn = null;
    this.connect_time = null;

    this.send_isn = null;
    this.send_window_scale = null;
    this.send_packets = {}; // send_packets is indexed by the expected ackno: seqno + length
    this.send_acks = {};
    this.send_retrans = {};
    this.send_next_seq = null;
    this.send_acked_seq = null;
    this.send_bytes_ip = null;
    this.send_bytes_tcp = null;
    this.send_bytes_payload = 0;

    this.recv_isn = null;
    this.recv_window_scale = null;
    this.recv_packets = {};
    this.recv_acks = {};
    this.recv_retrans = {};
    this.recv_next_seq = null;
    this.recv_acked_seq = null;
    this.recv_bytes_ip = 0;
    this.recv_bytes_tcp = 0;
    this.recv_bytes_payload = 0;

    EventEmitter.call(this);
}