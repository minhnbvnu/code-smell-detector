function tsip_event_subscribe(o_sip_session, i_code, s_phrase, o_sip_message, e_subscribe_type) {
    tsip_event.call(this, o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.SUBSCRIBE);
    this.e_subscribe_type = e_subscribe_type;
}