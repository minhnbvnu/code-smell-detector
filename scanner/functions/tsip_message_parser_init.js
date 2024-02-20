function tsip_message_parser_init(o_ragel_state){
	var cs = 0;

	// Ragel machine initialization.
	
/* line 172 "./src/parsers/tsip_parser_message.js" */
{
	 cs = tsip_machine_parser_message_start;
} /* JSCodeGen::writeInit */

/* line 105 "./ragel/tsip_parser_message.jrl" */
	
	o_ragel_state.i_cs = cs;
}