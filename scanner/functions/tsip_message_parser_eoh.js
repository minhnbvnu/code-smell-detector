function tsip_message_parser_eoh(o_ragel_state, o_msg, b_extract_content){
    if(o_msg && b_extract_content){
        var i_clen = o_msg.get_content_length();
        if((o_ragel_state.i_p + i_clen) < o_ragel_state.i_pe && !o_msg.o_content){
            var i_start = o_ragel_state.i_p + 1;
            var i_end = (i_start + i_clen);
			o_msg.o_content = new Array((i_end - i_start));
            for(var i = i_start, j = 0; i < i_end; ++i, ++j){
                o_msg.o_content[j] = o_ragel_state.o_data[i];
            }
            o_ragel_state.i_p += i_clen;
        }
        else{
            o_ragel_state.i_p = (o_ragel_state.i_pe - 1);
        }
    }
}