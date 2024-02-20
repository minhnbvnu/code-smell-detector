function mandreelInitPluginPlatform(params)
{

	if ( params.width != null )
		mandreelAppWidthSrc = params.width;

	if ( params.height != null )
		mandreelAppHeightSrc = params.height;


	mandreel_embed_plugin = Mandreel_document.createElement('embed');
	mandreel_embed_plugin.setAttribute('width',mandreelAppWidthSrc);
	mandreel_embed_plugin.setAttribute('height',mandreelAppHeightSrc);
	mandreel_embed_plugin.setAttribute('type',"application/halfbrick-npruntime-scriptable-plugin");

	var div = Mandreel_document.getElementById('canvasDiv');


	var oChild=div.firstChild;

	div.replaceChild(mandreel_embed_plugin, oChild);

	var flashElement = Mandreel_document.getElementById('FlashWrapper');
	if ( flashElement != null )
	{
		flashElement.style.visibility = "hidden";
		flashElement.style.width = "0px";
		flashElement.style.height = "0px";
	}





	Mandreel_window.MandreelInterWriteInt     = PluginMandreelInterWriteInt;
	Mandreel_window.MandreelInterWriteFloat   = PluginMandreelInterWriteInt;
	Mandreel_window.MandreelInterWriteString  = PluginMandreelInterWriteString;
	Mandreel_window.MandreelInterWriteWString = PluginMandreelInterWriteWString;
	Mandreel_window.MandreelLockFrame         = PluginMandreelLockFrame;
	Mandreel_window.MandreelUnlockFrame       = PluginMandreelUnlockFrame;
	Mandreel_window.MandreelInterCallFunction = PluginMandreelInterCallFunction;
	Mandreel_window.MandreelPause 			 = PluginMandreelPause;
	Mandreel_window.MandreelResume 			 = PluginMandreelResume;

	Mandreel_setTimeout(function () {

	if ( typeof(params.pluginSolutionName) != 'undefined' )
		mandreel_embed_plugin.init(params.pluginDLL, params.pluginWorkingFolder,params.pluginSolutionName);
	else
		mandreel_embed_plugin.init(params.pluginDLL, params.pluginWorkingFolder);


	mandreelAppStartStateFunc("ready",mandreelAppWidthSrc,mandreelAppHeightSrc);

	Mandreel_setTimeout("mandreel_plugin_draw()", 16);
	}, 100);

}