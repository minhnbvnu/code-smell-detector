function __tsip_transac_ist_Started_2_Proceeding_X_INVITE(ao_args) {
    var o_transac = ao_args[0];
    var o_request = ao_args[1];
	var i_ret = -1;

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		When a server transaction is constructed for a request, it enters the
		"Proceeding" state.  The server transaction MUST generate a 100
		(Trying) response unless it knows that the TU will generate a
		provisional or final response within 200 ms, in which case it MAY
		generate a 100 (Trying) response.

		RFC 3262 - 3. UAS Behavior
		A UAS MUST NOT attempt to send a 100 (Trying) response reliably.
	*/
	if(o_request){
		var o_response;
		if((o_response = new tsip_response(100, "Trying (sent from the Transaction Layer)", o_request))){
			i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);
            o_transac.set_last_response(o_response);
		}
	}
	if(i_ret == 0){ /* Send "100 Trying" is OK ==> alert dialog for the incoming INVITE */
        i_ret = o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_request);
	}
	return i_ret;
}