function MandreelInterGetFunctionPtr(value)
{
	return __FUNCTION_TABLE__[value >> 2];
}