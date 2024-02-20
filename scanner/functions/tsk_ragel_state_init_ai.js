function tsk_ragel_state_init_ai(o_self, ai_data) {
    return tsk_ragel_state_init_str(o_self, tsk_buff_ab2str(ai_data));
}