function tsk_ragel_state_init(o_self, o_data, i_size) {
    o_self.i_cs = 0;
    o_self.i_p = 0;
    o_self.i_pe = i_size;
    o_self.o_data = o_data;
    o_self.s_data = null;
    o_self.i_eof = 0;
    o_self.i_tag_start = 0;
    o_self.i_tag_end = i_size;
}