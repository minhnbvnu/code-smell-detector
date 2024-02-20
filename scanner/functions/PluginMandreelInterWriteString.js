function PluginMandreelInterWriteString(ptr, value)
{
	mandreel_embed_plugin.MandreelInterCalls("WriteString", ptr,value);
}