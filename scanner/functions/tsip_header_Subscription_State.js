function tsip_header_Subscription_State(s_state, s_reason, i_expires, i_retry_after){
	tsip_header.call(this, tsip_header_type_e.Subscription_State);
    this.s_state = s_state;
    this.s_reason = s_reason;
    this.i_expires = i_expires;
    this.i_retry_after = i_retry_after;
}