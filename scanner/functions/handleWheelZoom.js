function handleWheelZoom(e){
	chipsurround.focus();
	e.preventDefault();
	var n = e.deltaY / 100;
	if(n>0 && zoom>1) setZoom(zoom/1.2);
	if(n<0 && zoom<grMaxZoom) setZoom(zoom*1.2);
}