function __tsip_transport_ws_onmessage(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onmessage");

    var o_ragel_state = tsk_ragel_state_create();
    if(typeof(evt.data) == 'string'){
        tsk_ragel_state_init_str(o_ragel_state, evt.data);
    }
    else{
        tsk_ragel_state_init_ai(o_ragel_state, evt.data);
    }
    var o_message = tsip_message.prototype.Parse(o_ragel_state, true);

    if (o_message) {
        tsk_utils_log_info("recv=" + o_message);
        o_message.o_socket = this;
        return this.o_transport.get_layer().handle_incoming_message(o_message);
    }
    else {
        tsk_utils_log_error("Failed to parse message: " + evt.data);
        return -1;
    }
}