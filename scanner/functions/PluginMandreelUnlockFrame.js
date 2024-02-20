function PluginMandreelUnlockFrame()
{
	mandreel_embed_plugin.MandreelInterCalls("UnlockFrame");

	mandreel_plugin_current_sp-=300*1024;
}