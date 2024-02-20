function __tsip_transac_ict_Completed_2_Terminated_X_timerD(ao_args) {
    /*	draft-sparks-sip-invfix-03 - 8.4.  Pages 126 through 128
    If timer D fires while the client transaction is in the
    "Completed" state, the client transaction MUST move to the
    "Terminated" state.
    */

    /* Timers will be canceled by "tsip_transac_ict_OnTerminated" */
    return 0;
}