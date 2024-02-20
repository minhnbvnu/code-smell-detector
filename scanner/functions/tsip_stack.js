function tsip_stack(s_realm, s_impi, s_impu_uri, s_proxy_cscf_host, i_proxy_cscf_port) {
    if (!s_realm || !s_impi || !s_impu_uri) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }

    var o_uri_impu = tsip_uri.prototype.Parse(s_impu_uri);
    if (!o_uri_impu) {
        tsk_utils_log_error("'" + s_impu_uri + "' is not a valid IMPU Uri");
        return null;
    }

    if (tsk_string_index_of(s_realm, s_realm.length, "sip:") != 0 && tsk_string_index_of(s_realm, s_realm.length, "sips:") != 0){
        s_realm = tsk_string_format("sip:{0}", s_realm);
    }
    var o_uri_realm = tsip_uri.prototype.Parse(s_realm);
    if(!o_uri_realm){
        tsk_utils_log_error("'" + s_realm + "' is not a valid realm");
        return null;
    }

    this.e_state = tsip_transport_state_e.NONE;

    /* === Identity === */
    this.identity = {};
    this.identity.s_display_name = o_uri_impu.s_user_name;
    this.identity.o_uri_impu = o_uri_impu;
    this.identity.o_uri_pref = null;
    this.identity.s_impi = s_impi;
    this.identity.s_password = null;

    /* === Network === */
    this.network = {};
    this.network.o_transport = null;
    this.network.s_transport = "ws";
    this.network.s_local_ip = null;
    this.network.i_local_port = 0;
    this.network.s_proxy_cscf_host = s_proxy_cscf_host;
    this.network.i_proxy_cscf_port = i_proxy_cscf_port;
    // IMPORTANT: Safari and Opera support WebSocket but they are using the old version
    this.network.e_proxy_cscf_type = tsk_utils_have_webrtc4all() ? tsip_transport_type_e.UDP : tsip_transport_type_e.WS;
    this.network.o_uri_realm = o_uri_realm;
    this.network.s_proxy_outbound_host = null;
    this.network.i_proxy_outbound_port = 5060;
    this.network.e_proxy_outbound_type = this.network.e_proxy_cscf_type;
    this.network.s_websocket_server_url = null;
    this.network.ao_ice_servers = null;
    this.network.b_rtcweb_enabled = false;
    this.network.b_click2call_enabled = false;

    this.network.aor = {};
    this.network.aor.s_ip = null;
    this.network.aor.i_port = 0;

    /* === Security === */
    this.security = {};
    this.security.b_earlyIMS = true;

    this.security.tls = {};
    this.security.tls.s_ca = null;
    this.security.tls.s_pbk = null;
    this.security.tls.s_pvk = null;

    /* NAT Traversal */
    this.natt = {};
    this.natt.stun = {};
    this.natt.stun.s_ip = null;
    this.natt.stun.i_port = 0;
    this.natt.stun.s_login = null;
    this.natt.stun.s_pwd = null;

    /* Media */
    this.media = {};
    this.media.b_cache_stream = false;
    this.media.o_bandwidth = { audio:undefined, video:undefined };
    this.media.o_video_size = { minWidth:undefined, minHeight:undefined, maxWidth:undefined, maxHeight:undefined };

    /* Internals */
    this.o_timers = new tsip_timers();
    this.ao_sessions = new Array();
    this.ao_headers = new Array();
    this.o_usr_data = null;

    this.ao_uri_paths = new Array();
    this.ao_uri_service_routes = new Array();
    this.ao_uri_associated_uris = new Array();

    /* Layers */
    this.o_layer_dialog = new tsip_dialog_layer(this);
    this.o_layer_transac = new tsip_transac_layer(this);
    this.o_layer_transport = new tsip_transport_layer(this);

    this.__set(Array.prototype.slice.call(arguments, 5));
}