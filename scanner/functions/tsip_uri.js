function tsip_uri(e_type) {
    this.e_type = e_type;
    this.s_scheme = null;
    this.s_host = null;
    this.e_host_type = tsip_host_type_e.unknown;
    this.i_port = 0;
    this.s_user_name = null;
    this.s_password = null;
    this.s_display_name = null;
    this.ao_params = new Array();
    this.toString = function () {
        return tsip_uri_tostring(this, true, true);
    };
}