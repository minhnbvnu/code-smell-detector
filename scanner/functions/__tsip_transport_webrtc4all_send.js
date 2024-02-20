function __tsip_transport_webrtc4all_send(o_self, o_data, i_length) {

    if (!o_self.o_transport) {
        tsk_utils_log_error("Invalid state");
        return 0;
    }
    
    o_self.o_transport.SendTo(o_data, o_self.s_host, o_self.i_port);
    return i_length;
}