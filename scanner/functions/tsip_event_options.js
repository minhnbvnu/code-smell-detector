function tsip_event_options(o_sip_session, i_code, s_phrase, o_sip_message, e_options_type) {
    this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.OPTIONS);
    this.e_type = e_options_type;
}