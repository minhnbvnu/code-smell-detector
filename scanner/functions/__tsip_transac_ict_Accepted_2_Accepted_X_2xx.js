function __tsip_transac_ict_Accepted_2_Accepted_X_2xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];

	/*	draft-sparks-sip-invfix-03 - 7.2. UAC Impacts
		A 2xx response received while in the "Accepted" state MUST be passed to the TU and
		the machine remains in the "Accepted" state.  The client transaction
		MUST NOT generate an ACK to any 2xx response on its own.  The TU
		responsible for the transaction will generate the ACK.
	*/
	
	/* Pass the response to the TU. */
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}