function tsip_event_message(o_sip_session, i_code, s_phrase, o_message, e_message_type) {
    this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_message, tsip_event_type_e.MESSAGE);
    this.e_message_type = e_message_type;
}