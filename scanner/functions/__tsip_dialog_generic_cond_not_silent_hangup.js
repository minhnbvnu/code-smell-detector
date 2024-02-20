function __tsip_dialog_generic_cond_not_silent_hangup(o_dialog, o_message){
    return !__tsip_dialog_generic_cond_silent_hangup(o_dialog, o_message);
}