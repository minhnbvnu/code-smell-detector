function openwebrx_init()
{
	if(ios||is_chrome) e("openwebrx-big-grey").style.display="table-cell";
	(opb=e("openwebrx-play-button-text")).style.marginTop=(window.innerHeight/2-opb.clientHeight/2).toString()+"px";
	init_rx_photo();
	open_websocket();
    secondary_demod_init();
	place_panels(first_show_panel);
	window.setTimeout(function(){window.setInterval(debug_audio,1000);},1000);
	window.addEventListener("resize",openwebrx_resize);
	check_top_bar_congestion();

	//Synchronise volume with slider
	updateVolume();
	waterfallColorsDefault();
}