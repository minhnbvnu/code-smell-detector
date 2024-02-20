function s0000_Started_2_InProgress_X_iINVITE(ao_args){
    var o_dialog = ao_args[0];
    var o_request = ao_args[1];
	
	o_dialog.b_is_client = false;
	o_dialog.o_last_iInvite = o_request;
	o_dialog.b_support_update = o_request.is_allowed("UPDATE");

	/* Update state */
	o_dialog.update_with_invite(o_request);

	/* Send In Progress 
		RFC 3262 - 3 UAS Behavior
		
		The provisional response to be sent reliably is constructed by the
		UAS core according to the procedures of Section 8.2.6 of RFC 3261.
		In addition, it MUST contain a Require header field containing the
		option tag 100rel, and MUST include an RSeq header field.  The value
		of the header field for the first reliable provisional response in a
		transaction MUST be between 1 and 2**31 - 1.
	*/
	o_dialog.i_rseq = Math.floor((Math.random() * 0x0000FFFF));
	o_dialog.require.b_100rel = true;
	return o_dialog.send_response(o_request, 183, "Session in Progress", true);
}