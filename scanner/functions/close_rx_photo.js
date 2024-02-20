function close_rx_photo()
{
	rx_photo_state=0;
	animate_to(e("webrx-top-photo-clip"),"maxHeight","px",67,0.93,1000,60,function(){resize_waterfall_container(true);});
	e("openwebrx-rx-details-arrow-down").style.display="block";
	e("openwebrx-rx-details-arrow-up").style.display="none";
}