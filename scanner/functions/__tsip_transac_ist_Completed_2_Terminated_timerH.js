function __tsip_transac_ist_Completed_2_Terminated_timerH(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.2.1 INVITE Server Transaction
		If timer H fires while in the "Completed" state, it implies that the
		ACK was never received.  In this case, the server transaction MUST
		transition to the "Terminated" state, and MUST indicate to the TU
		that a transaction failure has occurred.
	*/
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.TRANSPORT_ERROR, null);
}