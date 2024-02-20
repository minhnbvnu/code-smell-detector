function MandreelLockFrame()
{
	assert(g_mandreel_frame_inframe == false, "calling lockframe during render frame");
	assert(g_mandreel_frame_locked == false, "calling lockframe twice");
	g_mandreel_frame_locked = true;

	return g_stack_pointer+800*1024;
}