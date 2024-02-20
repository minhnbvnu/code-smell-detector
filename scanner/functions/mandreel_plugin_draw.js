function mandreel_plugin_draw()
{
	var canvas = Mandreel_document.getElementById('canvasDiv');
	WebGLUtils.requestAnimationFrame(canvas, mandreel_plugin_draw);
	mandreel_embed_plugin.MandreelInterCalls("AppDraw");

}