function prev_not_comma(o_ragel_state, i_p){
	return (o_ragel_state.i_pe <= i_p) || (o_ragel_state.o_data[i_p - 1] != ',');
}