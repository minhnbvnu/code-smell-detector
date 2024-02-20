function tsip_transport(e_type, o_stack, s_host, i_port, s_description, fn_callback) {
    if(!o_stack){
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    switch(e_type){
        case tsip_transport_type_e.WS:
            {
                this.b_reliable = true;
                this.s_scheme = "sip";
                this.s_protocol = "ws";
                this.s_via_protocol = "WS";
                this.s_service = "SIP+D2W";
                this.o_ws = null;
                this.__start = function () { return __tsip_transport_ws_start(this); };
                this.__stop = function () { return __tsip_transport_ws_stop(this); };
                this.__have_socket = function (o_socket) { return __tsip_transport_ws_have_socket(this, o_socket); }
                this.__send = function (o_data, i_length) { return __tsip_transport_ws_send(this, o_data, i_length); }
                break;
            }
        case tsip_transport_type_e.WSS:
            {
                this.b_reliable = true;
                this.s_scheme = "sips";
                this.s_protocol = "wss";
                this.s_via_protocol = "WSS";
                this.s_service = "SIPS+D2W";
                this.o_ws = null;
                this.__start = function () { return __tsip_transport_ws_start(this); };
                this.__stop = function () { return __tsip_transport_ws_stop(this); };
                this.__have_socket = function (o_socket) { return __tsip_transport_ws_have_socket(this, o_socket); }
                this.__send = function (o_data, i_length) { return __tsip_transport_ws_send(this, o_data, i_length); }
                break;
            }

        case tsip_transport_type_e.UDP:
            {
                if(!tsk_utils_have_webrtc4all()){
                    tsk_utils_log_error("Transport not supported");
                    return null;
                }

                this.b_reliable = false;
                this.s_scheme = "sip";
                this.s_protocol = "udp";
                this.s_via_protocol = "UDP";
                this.s_service = "SIP+D2U";
                this.o_transport = null;
                this.__start = function () { return __tsip_transport_webrtc4all_start(this); };
                this.__stop = function () { return __tsip_transport_webrtc4all_stop(this); };
                this.__have_socket = function (o_socket) { return __tsip_transport_webrtc4all_have_socket(this, o_socket); }
                this.__send = function (o_data, i_length) { return __tsip_transport_webrtc4all_send(this, o_data, i_length); }
                break;
            }

        case tsip_transport_type_e.TCP:
        case tsip_transport_type_e.TLS:
        case tsip_transport_type_e.SCTP:
        case tsip_transport_type_e.DTLS:
        default:
            {
                tsk_utils_log_error(e_type + " not supported as a valid SIP transport");
                return null;
            }
    }
    
    this.e_type = e_type;
    this.o_stack = o_stack;
    this.s_host = s_host;
    this.i_port = i_port;
    this.s_description = s_description;
    this.fn_callback = fn_callback;
    this.b_started = false;

    return this;
}