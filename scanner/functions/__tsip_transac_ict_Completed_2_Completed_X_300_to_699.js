function __tsip_transac_ict_Completed_2_Completed_X_300_to_699(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];

	/*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
		Any retransmissions of a response with status code 300-699 that
		are received while in the "Completed" state MUST cause the ACK to
		be re-passed to the transport layer for retransmission, but the
		newly received response MUST NOT be passed up to the TU.
	*/

    return (o_transac.send_ack(o_response) <= 0 ? -1 : 0);
}