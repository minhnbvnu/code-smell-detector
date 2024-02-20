function __tsip_transport_ws_start(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    var s_url = tsk_string_is_null_or_empty(o_self.o_stack.network.s_websocket_server_url) ?
             tsk_string_format("{0}://{1}:{2}",o_self.s_protocol, o_self.s_host, o_self.i_port) : o_self.o_stack.network.s_websocket_server_url;
    tsk_utils_log_info("Connecting to '"+s_url+"'");
    o_self.o_ws = new WebSocket(s_url, 'sip');
    o_self.o_ws.binaryType = "arraybuffer";
    o_self.o_ws.o_transport = o_self;
    o_self.o_ws.onopen = __tsip_transport_ws_onopen;
    o_self.o_ws.onclose = __tsip_transport_ws_onclose;
    o_self.o_ws.onmessage = __tsip_transport_ws_onmessage;
    o_self.o_ws.onerror = __tsip_transport_ws_onerror;

    return 0;
}