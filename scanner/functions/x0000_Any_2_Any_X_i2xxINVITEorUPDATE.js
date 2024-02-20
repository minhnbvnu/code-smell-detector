function x0000_Any_2_Any_X_i2xxINVITEorUPDATE(ao_args) {
    var o_dialog = ao_args[0];
    var o_response = ao_args[1];
    var i_ret = 0;

    // ICT will always retransmit the 2xx (draft-sparks-sip-invfix-03 - 7.2. UAC Impacts)
    if (this.o_last_oInvite && this.o_last_oInvite.o_hdr_CSeq.i_seq == o_response.o_hdr_CSeq.i_seq) {
        if (o_response.is_response_to_invite()) {
            return o_dialog.send_ack(o_response);
        }
    }

	/* Update the dialog state */
	if((i_ret = o_dialog.update_with_response(o_response))){
		return i_ret;
	}

    /* session timers */
    // FIXME
	//if(self->stimers.timer.timeout){
	//	tsip_dialog_invite_stimers_handle(self, r2xx);
	//}

    /* Process remote offer */
    var b_is_offer = o_dialog.o_msession_mgr && !o_dialog.o_msession_mgr.has_lo();
    if ((i_ret = o_dialog.process_ro(o_response, b_is_offer))) {
        return i_ret;
    }

	/* send ACK */
    if (o_response.is_response_to_invite()) {
        i_ret = o_dialog.send_ack(o_response);
    }
	
	return i_ret;
}