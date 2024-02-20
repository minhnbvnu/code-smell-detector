function __tsip_transport_webrtc4all_start(o_self) {
    if (!o_self) {
        tsk_utils_log_error("Invalid argument");
        return -1;
    }

    var b_isInternetExplorer = (WebRtc4all_GetType() == WebRtcType_e.IE);
    var s_url = tsk_string_is_null_or_empty(o_self.o_stack.network.s_proxy_outbound_host) ?
             tsk_string_format("{0}://{1}:{2}", o_self.s_protocol, o_self.s_host, o_self.i_port) : 
             tsk_string_format("{0}://{1}:{2}", o_self.s_protocol, o_self.o_stack.network.s_proxy_outbound_host, o_self.o_stack.network.i_proxy_outbound_port);
    
    tsk_utils_log_info("Connecting to '" + s_url+"'");
    o_self.o_transport = WebRtc4all_GetPlugin().createNetTransport();
    if (b_isInternetExplorer) {
        eval("function o_self.o_transport::OnEvent(i_type, s_data) { return __tsip_transport_webrtc4all_onevent (o_self, i_type, s_data); }");
    }
    else {
        o_self.o_transport.opaque = o_self;
        o_self.o_transport.setCallbackFuncName("__tsip_transport_webrtc4all_onevent");
    }
    
    try{
        // if sip outbound proxy is defined then, use it otherwise perform DNS NAPTR+SRV ("SIP+D2U")
        if(o_self.o_stack.network.s_proxy_outbound_host && o_self.o_stack.network.i_proxy_outbound_port){
            o_self.s_host = o_self.o_stack.network.s_proxy_outbound_host;
            o_self.i_port = o_self.o_stack.network.i_proxy_outbound_port;
        }
        else{
            o_self.o_transport.SetDomain(o_self.o_stack.network.o_uri_realm.s_host); // DNS NAPTR+SRV ("SIP+D2U")
        }

        // IMPORTANT: StartDebug is not implemented in all functions
        //if(o_self.o_transport.StartDebug){
            //o_self.o_transport.StartDebug(); // To debug ATL/COM objects (C/C++)
        //}
        o_self.o_transport.Start(b_isInternetExplorer ? WebRtc4all_GetLooper() : 0);
        if(o_self.o_transport.defaultDestAddr && o_self.o_transport.defaultDestPort){ // use connection info from DNS results
            o_self.s_host = o_self.o_transport.defaultDestAddr;
            o_self.i_port = o_self.o_transport.defaultDestPort;
            tsk_utils_log_info("Transport default destination=" + o_self.s_host + ":" + o_self.i_port);
        }
        o_self.b_started = true;
        o_self.signal(tsip_transport_event_type_e.STARTED, "Network transport started", null);
    }
    catch(e){
        tsk_utils_log_error(e);
        return -1;
    }

    return 0;
}