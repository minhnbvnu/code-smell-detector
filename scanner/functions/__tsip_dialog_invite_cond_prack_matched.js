function __tsip_dialog_invite_cond_prack_matched(o_dialog, o_message){
	var o_hdr_RAck;

	if(!o_dialog.o_last_o1xxrel){
		return false;
	}

	if((o_hdr_RAck = o_message.get_header(tsip_header_type_e.RAck))){
	    if ((o_hdr_RAck.i_seq == o_dialog.i_rseq) &&
			(tsk_string_iequals(o_hdr_RAck.s_method, o_dialog.o_last_o1xxrel.o_hdr_CSeq.s_method)) &&
			(o_hdr_RAck.i_cseq == o_dialog.o_last_o1xxrel.o_hdr_CSeq.i_seq)) {
				o_dialog.i_rseq++;
				return true;
		}
		else{
			tsk_utils_log_warn("Failed to match PRACK request");
		}
	}
	
	return false;
}