function __tsip_dialog_register_cond_client_unregistering(o_dialog, o_message) {
    return !o_dialog.b_is_server && o_dialog.b_unregistering;
}