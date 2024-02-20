function blinkSpan(){
	if(currentStyle=='inline'){
		currentStyle='none';
	}else{
		currentStyle='inline';
	}
	document.getElementById('blink').style.display = currentStyle;
	setTimeout('blinkSpan()',100);
}