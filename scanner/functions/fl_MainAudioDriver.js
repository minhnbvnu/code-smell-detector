function fl_MainAudioDriver(audioServer, audioUrl)
{
	mandreel_flashaudio_server = audioServer;
	if ( mandreel_flashaudio_lite )
		mandreel_flashaudio_server = "";
	if ( mandreel_flashaudio_server != "" )
	{
		Mandreel_window.addEventListener("message", receiveMessage2, false);
		var el = document.createElement("iframe");
		el.setAttribute('id', 'ninja-iframe');
		el.setAttribute('width', '0');
		el.setAttribute('height', '0');
		el.setAttribute('frameborder', '0');
		document.body.appendChild(el);
		el.onerror = function(message) { alert(message); };
		el.setAttribute('src', audioServer+audioUrl+"/MandreelAudio.html");
		setTimeout("CheckNinjaFrameReady()", 1000);
	}
	else
	{
		setTimeout("mandreel_audio_load_flash()", 10);
	}
}