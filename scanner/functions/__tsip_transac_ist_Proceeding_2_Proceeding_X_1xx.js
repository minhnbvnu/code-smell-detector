function __tsip_transac_ist_Proceeding_2_Proceeding_X_1xx(ao_args) {
    var o_transac = ao_args[0];
    var o_response = ao_args[1];
	var i_ret;

	/* Send to the transport layer */
    i_ret = (o_transac.send(o_transac.s_branch, o_response) > 0 ? 0 : -1);
	/* Update last response */
	o_transac.set_last_response(o_response);

	return i_ret;
}