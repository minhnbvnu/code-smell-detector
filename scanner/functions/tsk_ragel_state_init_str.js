function tsk_ragel_state_init_str(o_self, s_str) {
    tsk_ragel_state_init(o_self, tsk_buff_str2ib(s_str), s_str.length);
    o_self.s_data = s_str;
}