function __tsip_transport_webrtc4all_stop(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    if (o_self.o_transport) {
        o_self.o_transport.Stop();
    }

    return 0;
}