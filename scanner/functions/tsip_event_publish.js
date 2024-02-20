function tsip_event_publish(o_sip_session, i_code, s_phrase, o_sip_message, e_publish_type) {
    tsip_event.call(this, o_sip_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.PUBLISH);
    this.e_publish_type = e_publish_type;
}