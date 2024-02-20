function toggleMute()
{
	if (mute) {
		mute = false;
		e("openwebrx-mute-on").id="openwebrx-mute-off";
		e("openwebrx-mute-img").src="gfx/openwebrx-speaker.png";
		e("openwebrx-panel-volume").disabled=false;
		e("openwebrx-panel-volume").style.opacity=1.0;
		e("openwebrx-panel-volume").value = volumeBeforeMute;
	} else {
		mute = true;
		e("openwebrx-mute-off").id="openwebrx-mute-on";
		e("openwebrx-mute-img").src="gfx/openwebrx-speaker-muted.png";
		e("openwebrx-panel-volume").disabled=true;
		e("openwebrx-panel-volume").style.opacity=0.5;
		volumeBeforeMute = e("openwebrx-panel-volume").value;
		e("openwebrx-panel-volume").value=0;
	}

	updateVolume();
}