function tsip_event_info(o_sip_session, i_code, s_phrase, o_sip_message, e_info_type) {
    //this.__proto__ = new tsip_event(o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.INFO);
    tsip_event.call(this, o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.INFO);
    this.e_type = e_info_type;
}