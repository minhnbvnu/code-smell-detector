function __tsip_transac_ist_Accepted_2_Accepted_INVITE(ao_args) {
    var o_transac = ao_args[0];
	
	/*	draft-sparks-sip-invfix-03 - 8.7. Page 137
		The purpose of the "Accepted" state is to absorb retransmissions
		of an accepted INVITE request.  Any such retransmissions are
		absorbed entirely within the server transaction.  They are not
		passed up to the TU since any downstream UAS cores that accepted
		the request have taken responsibility for reliability and will
		already retransmit their 2xx responses if neccessary.
	*/

	/*	Do not pass to the TU (see above)
		VERY IMPORTANT: INVITE dialog is responsible for reliability of the 2xx response.
	*/
    if (o_transac.o_lastResponse) {
        return (o_transac.send(o_transac.s_branch, o_transac.o_lastResponse) > 0 ? 0 : -1);
    }
	return 0;
}