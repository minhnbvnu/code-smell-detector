function init_rx_photo()
{
	e("webrx-top-photo-clip").style.maxHeight=rx_photo_height.toString()+"px";
	window.setTimeout(function() { animate(e("webrx-rx-photo-title"),"opacity","",1,0,1,500,30); },1000);
	window.setTimeout(function() { animate(e("webrx-rx-photo-desc"),"opacity","",1,0,1,500,30); },1500);
	window.setTimeout(function() { close_rx_photo() },2500);
}