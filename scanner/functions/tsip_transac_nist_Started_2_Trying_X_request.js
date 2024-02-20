function tsip_transac_nist_Started_2_Trying_X_request(ao_args){
	var o_transac = ao_args[0];
    var o_request = ao_args[1];

	/*	RFC 3261 - 17.2.2
		The state machine is initialized in the "Trying" state and is passed
		a request other than INVITE or ACK when initialized.  This request is
		passed up to the TU.  Once in the "Trying" state, any further request
		retransmissions are discarded.  A request is a retransmission if it
		matches the same server transaction, using the rules specified in
		Section 17.2.3.
	*/
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_request);
}