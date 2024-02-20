function MandreelAudioStartedNacl()
{
	var helloWorldModule = null;
	helloWorldModule = Mandreel_document.getElementById('hello_world');
	helloWorldModule.postMessage('init');
	var flashElement = Mandreel_document.getElementById('FlashWrapper');
	if ( flashElement != null )
		flashElement.style.visibility = "hidden";
	mandreelAppStartStateFunc("ready",mandreelAppCanvasWidth,mandreelAppCanvasHeight);
}