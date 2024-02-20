function tsip_action(e_type) {
    this.e_type = e_type;
    this.ao_headers = new Array();
    this.o_content = null;

    this.line_resp = {};
    this.line_resp.i_code = 0;
    this.line_resp.s_phrase = null;

    this.media = {};
    this.media.e_type = tmedia_type_e.NONE;
    this.media.ao_params = new Array();

    this.dtmf = {};
    this.dtmf.i_volume = -1;
    this.dtmf.i_event = -1;

    this.ect = {};
    this.ect.s_to = null;

    this.mute = {};
    this.mute.b_muted = false;
    this.mute.s_media = null;
}