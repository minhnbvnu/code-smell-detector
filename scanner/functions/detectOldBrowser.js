function detectOldBrowser(){
	if(!("getBoundingClientRect" in document.documentElement)){
		// simplify these functions (and adjust layout window position)
		localx=	function(el, gx){
				return gx-el.offsetLeft;
			}
		localy=	function(el, gy){
				return gy-el.offsetTop;
			}
		document.getElementById('plain').style["float"]="right";
		document.getElementById('chip').style.left=0;
		document.getElementById('chip').style.top=0;
		document.getElementById('chip').style.border=0;
	}
}