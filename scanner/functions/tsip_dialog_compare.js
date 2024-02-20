function tsip_dialog_compare(o_d1, o_d2) {
    if (o_d1 && o_d2) {
        if ((o_d1.s_callid == o_d2.s_callid)
			&& ((o_d1.s_tag_local == o_d2.s_tag_local))
			&& ((o_d1.s_tag_remote == o_d2.s_tag_remote))) {
            return 0;
        }
    }
    return -1;
}