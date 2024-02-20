function __tsip_transport_ws_send(o_self, o_data, i_length) {

    if (!o_self.o_ws) {
        tsk_utils_log_error("Invalid state");
        return 0;
    }

    o_self.o_ws.send(o_data);
    return i_length;
}