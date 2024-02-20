function toggle_rx_photo()
{
	if(dont_toggle_rx_photo_flag) { dont_toggle_rx_photo_flag=0; return; }
	if(rx_photo_state) close_rx_photo();
	else open_rx_photo()
}