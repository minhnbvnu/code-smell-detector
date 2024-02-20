function PluginMandreelInterCallFunction()
{
	var total_args = arguments.length;

	switch(total_args)
	{
		case 0:
			return mandreel_embed_plugin.MandreelInterCallFunction();
		case 1:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0]);
		case 2:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1]);
		case 3:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2]);
		case 4:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3]);
		case 5:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
		case 6:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
		case 7:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
		case 8:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
		case 9:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8]);
		case 10:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);
		case 11:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10]);
		case 12:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11]);
		case 13:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12]);
		case 14:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13]);
		case 15:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14]);
		case 16:
			return mandreel_embed_plugin.MandreelInterCallFunction(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9], arguments[10], arguments[11], arguments[12], arguments[13], arguments[14], arguments[15]);
		break;
	}
}