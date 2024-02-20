function __tsip_transport_ws_onerror(evt) {
    tsk_utils_log_info("__tsip_transport_ws_onerror");
    this.o_transport.signal(tsip_transport_event_type_e.ERROR, evt.reason, null);
}