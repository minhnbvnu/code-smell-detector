function tsip_event_register(o_session, i_code, s_phrase, o_sip_message, e_register_type) {
    tsip_event.call(this, o_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.REGISTER);
    this.e_register_type = e_register_type;
}