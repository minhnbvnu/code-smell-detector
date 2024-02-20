function tsip_event_invite(o_session, i_code, s_phrase, o_sip_message, e_invite_type) {
    tsip_event.call(this, o_session, i_code, s_phrase, o_sip_message, tsip_event_type_e.INVITE);
    this.e_invite_type = e_invite_type;
}