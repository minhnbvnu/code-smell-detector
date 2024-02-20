function __tsip_transac_ist_Confirmed_2_Terminated_timerI(ao_args) {
    /*	RFC 3261 - 17.2.1 INVITE Server Transaction
    Once timer I fires, the server MUST transition to the
    "Terminated" state.

    Once the transaction is in the "Terminated" state, it MUST be
    destroyed immediately.  As with client transactions, this is needed
    to ensure reliability of the 2xx responses to INVITE.
    */
    return 0;
}