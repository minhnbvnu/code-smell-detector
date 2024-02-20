function __tsip_transport_ws_stop(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    if (o_self.o_ws) {
        o_self.o_ws.close();
    }

    return 0;
}