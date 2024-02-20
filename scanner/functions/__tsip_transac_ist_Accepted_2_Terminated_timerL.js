function __tsip_transac_ist_Accepted_2_Terminated_timerL(ao_args) {
    /*	draft-sparks-sip-invfix-03 - 8.7. Page 137
    If Timer L fires while the INVITE server transaction is in the "Accepted" state, the transaction
    MUST transition to the "Terminated" state. Once the transaction is in the "Terminated" state, it MUST be
    destroyed immediately.
    */
    return 0;
}