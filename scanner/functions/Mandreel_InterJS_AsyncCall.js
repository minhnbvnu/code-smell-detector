function Mandreel_InterJS_AsyncCall(sp)
{
	var method_ptr = heap32[sp>>2];sp+=4;
	var _func_name = get_string_from_ptr(method_ptr);
	var param_ptr = heap32[sp>>2];sp+=4;
	var _param = get_string_from_ptr(param_ptr);

	__mandreel_async_calls_js.push({func_name:_func_name,param:_param});
}