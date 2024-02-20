function __tsip_transport_webrtc4all_onevent(o_self, i_type, s_data) {
    tsk_utils_log_info("__tsip_transport_webrtc4all_onevent");
    if(s_data){
        var o_ragel_state = tsk_ragel_state_create();
        tsk_ragel_state_init_str(o_ragel_state, s_data);

        var o_message = tsip_message.prototype.Parse(o_ragel_state, true);
        if (o_message) {
            tsk_utils_log_info("RECV=" + o_message.toString());
            o_message.o_socket = o_self.o_transport;
            return o_self.get_layer().handle_incoming_message(o_message);
        }
        else {
            tsk_utils_log_error("Failed to parse message: " + s_data);
            return -1;
        }
    }
}