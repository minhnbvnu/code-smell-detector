function tsip_uri_make_valid(s_uri, s_domain) {
    if (!s_uri || !s_domain) {
        tsk_utils_log_error("Invalid argument");
        return null;
    }
    if (tsk_string_index_of(s_uri, s_uri.length, "\"") == 0 || tsk_string_index_of(s_uri, s_uri.length, "<") == 0) {
        return tsip_uri.prototype.Parse(s_uri);
    }
    var b_teluri = (tsk_string_index_of(s_uri, s_uri.length, "tel:") == 0);
    if (tsk_string_index_of(s_uri, s_uri.length, "sip:") != 0 && tsk_string_index_of(s_uri, s_uri.length, "sips:") != 0 && !b_teluri) {
        s_uri = "sip:" + s_uri;
    }
    if (!b_teluri && tsk_string_index_of(s_uri, s_uri.length, "@") == -1) { /* no domain name in tel: uri */
        s_uri += "@" + s_domain;
    }
    return tsip_uri.prototype.Parse(s_uri); 
}