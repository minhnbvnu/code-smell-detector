function __tsip_dialog_invite_cond_is_f_refer(o_dialog, o_message){
    var o_hdr_Refer_To = o_message.get_header(tsip_header_type_e.Refer_To);
    return (!o_hdr_Refer_To || !o_hdr_Refer_To.o_uri);
}