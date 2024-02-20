function __tsip_transport_ws_onclose(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onclose");
    this.o_transport.b_started = false;
    this.o_transport.signal(tsip_transport_event_type_e.STOPPED, evt.reason, null);
}