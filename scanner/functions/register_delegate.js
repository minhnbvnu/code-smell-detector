function register_delegate(ptr_func)
{
	var functionId = mandreel_pos_function_table;
	__FUNCTION_TABLE__[functionId] = ptr_func;

	mandreel_pos_function_table++;
	return functionId*4;
}