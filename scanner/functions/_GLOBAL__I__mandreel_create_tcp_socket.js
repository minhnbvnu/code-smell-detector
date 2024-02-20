function _GLOBAL__I__mandreel_create_tcp_socket(sp)
{
	var i7;
	var fp = sp>>2;
	var r0;
	var r1;
var __label__ = 0;
	i7 = sp + -8;var g0 = i7>>2; // save stack
	r0 = mandreel_flash_tcp_onError__index__;
	r1 = _ZZL32_mandreel_init_tcp_socket_librayvE47s_723478567_mandreel_mandreel_flash_tcp_onError;
	heap32[(g0)] = r0;
	heap32[(g0+1)] = r1;
	iMandreelRegisterExternalCallback(i7);
	return;
}