function __tsip_transac_ict_Calling_2_Completed_X_300_to_699(ao_args) {
    var o_transac = ao_args[0];
	var o_response = ao_args[1];
	var i_ret;

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		When in either the "Calling" or "Proceeding" states, reception of
		a response with status code from 300-699 MUST cause the client
		transaction to transition to "Completed".  The client transaction
		MUST pass the received response up to the TU, and the client
		transaction MUST generate an ACK request, even if the transport is
		reliable (guidelines for constructing the ACK from the response
		are given in Section 17.1.1.3) and then pass the ACK to the
		transport layer for transmission.  The ACK MUST be sent to the
		same address, port, and transport to which the original request
		was sent.
	*/
	/* Do not retransmit */
	if(!o_transac.b_reliable){
		o_transac.timer_cancel('A');
	}
	o_transac.timer_cancel('B'); /* Now it's up to the UAS to update the FSM. */

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		The client transaction MUST start timer D when it enters the
		"Completed" state for any reason, with a value of at least 32
		seconds for unreliable transports, and a value of zero seconds for
		reliable transports.  Timer D reflects the amount of time that the
		server transaction can remain in the "Completed" state when
		unreliable transports are used.
   */
	o_transac.timer_schedule('ict', 'D'); /* timerD already have the right value (0 if reliable and non-zero otherwise) */

	/* Send ACK */
	if ((i_ret = o_transac.send_ack(o_response)) <= 0) {
	    return i_ret;
	}

	/* Pass the response to the dialog. */
    return o_transac.get_dialog().callback(tsip_dialog_event_type_e.I_MSG, o_response);
}