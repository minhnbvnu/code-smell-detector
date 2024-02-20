function tsip_transac_nist_Completed_2_Terminated_X_tirmerJ(ao_args){
	/*	RFC 3261 - 17.2.2
		The server transaction remains in this state (Completed) until Timer J fires, at
	    which pofunction it MUST transition to the "Terminated" state.
	*/

	/*	RFC 3261 - 17.2.2
		THE SERVER TRANSACTION MUST BE DESTROYED THE INSTANT IT ENTERS THE "TERMINATED" STATE.
	*/
	return 0;
}