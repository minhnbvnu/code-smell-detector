function __tsip_transac_nict_Completed_2_Terminated_X_timerK(ao_args) {
    /*	RFC 3261 - 17.1.2.2
    If Timer K fires while in this state (Completed), the client transaction
    MUST transition to the "Terminated" state.
    */

    /*	RFC 3261 - 17.1.2.2
    ONCE THE TRANSACTION IS IN THE TERMINATED STATE, IT MUST BE DESTROYED IMMEDIATELY.
    */

    /* Timers will be canceled by "tsip_transac_nict_OnTerminated" */

    //TSIP_TRANSAC(self)->dialog->callback(TSIP_TRANSAC(self)->dialog, tsip_dialog_transac_ok, 0);

    return 0;
}