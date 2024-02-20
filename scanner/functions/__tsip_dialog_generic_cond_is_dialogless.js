function __tsip_dialog_generic_cond_is_dialogless(o_dialog, o_message) { // /!\ Not dialogless in SIP meaning but just to say "2xx->Terminated" instead of "2xx->Connected"
    switch(o_dialog.e_type){
        case tsip_dialog_type_e.INFO:
        case tsip_dialog_type_e.MESSAGE:
        case tsip_dialog_type_e.OPTIONS:
            return true;
        default: return false;
    }
}