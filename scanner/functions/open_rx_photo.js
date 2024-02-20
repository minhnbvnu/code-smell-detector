function open_rx_photo()
{
	rx_photo_state=1;
	e("webrx-rx-photo-desc").style.opacity=1;
	e("webrx-rx-photo-title").style.opacity=1;
	animate_to(e("webrx-top-photo-clip"),"maxHeight","px",rx_photo_height,0.93,1000,60,function(){resize_waterfall_container(true);});
	e("openwebrx-rx-details-arrow-down").style.display="none";
	e("openwebrx-rx-details-arrow-up").style.display="block";
}