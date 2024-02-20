function PluginMandreelLockFrame()
{
	var result = mandreel_embed_plugin.MandreelInterCalls("LockFrame");

	mandreel_plugin_current_sp+=300*1024;

	assert(mandreel_plugin_current_sp<1024*1024);

	return result+mandreel_plugin_current_sp;
}