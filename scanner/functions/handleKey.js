function handleKey(e){
	var c = e.charCode || e.keyCode;
	c = String.fromCharCode(c);
	if('zx<>?np'.indexOf(c)==-1) return;
	if((c=='x' || c=='<') && zoom>1) setZoom(zoom/1.2);
	else if((c=='z' || c=='>') && zoom<grMaxZoom) setZoom(zoom*1.2);
	else if(c=='?') setZoom(1);
	else if(c=='n') stepForward();
	else if(c=='p') stepBack();
}