function __tsip_transac_ict_Started_2_Calling_X_send(ao_args) {
    var o_transac = ao_args[0];

    //== Send the request
    o_transac.send(o_transac.s_branch, o_transac.o_request);

	/* RFC 3261 - 17.1.1.2 Formal Description
		If an unreliable transport is being used, the client transaction MUST 
		start timer A with a value of T1.
		If a reliable transport is being used, the client transaction SHOULD
		NOT start timer A (Timer A controls request retransmissions).  For
		any transport, the client transaction MUST start timer B with a value
		of 64*T1 seconds (Timer B controls transaction timeouts).
	*/
    if (!o_transac.b_reliable) {
        o_transac.timer_schedule('ict', 'A');
    }
	o_transac.timer_schedule('ict', 'B');

	return 0;
}