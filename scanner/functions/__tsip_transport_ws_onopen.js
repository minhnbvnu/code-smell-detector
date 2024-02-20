function __tsip_transport_ws_onopen(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onopen");
    this.o_transport.b_started = true;
    this.o_transport.signal(tsip_transport_event_type_e.STARTED, evt.reason, null);
}