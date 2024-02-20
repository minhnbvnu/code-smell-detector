function __tsip_transac_ict_Calling_2_Calling_X_timerA(ao_args) {
    var o_transac = ao_args[0];

	/*	RFC 3261 - 17.1.1.2 Formal Description
		When timer A fires, the client transaction MUST retransmit the
		request by passing it to the transport layer, and MUST reset the
		timer with a value of 2*T1.  The formal definition of retransmit

		within the context of the transaction layer is to take the message
		previously sent to the transport layer and pass it to the transport
		layer once more.

		When timer A fires 2*T1 seconds later, the request MUST be
		retransmitted again (assuming the client transaction is still in this
		state).  This process MUST continue so that the request is
		retransmitted with intervals that double after each transmission.
		These retransmissions SHOULD only be done while the client
		transaction is in the "calling" state.
	*/

	//== Send the request
	o_transac.send(o_transac.s_branch, o_transac.o_request);
    	
    o_transac.i_timerA <<= 1; /* Will not raise indefinitely ==> see timer B */
	o_transac.timer_schedule('ict', 'A');

	return 0;
}