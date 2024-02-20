function setupChipLayoutGraphics(){
	setupLayerVisibility();
	setupBackground();
	setupOverlay();
	setupHilite();
	setupHitBuffer();
	recenter();
	refresh();
	document.getElementById('waiting').style.display = 'none';
	setStatus('Ready!');  // would prefer chipStatus but it's not idempotent
	// pre-fill the Find box if parameters supplied
	if(typeof findThese != "undefined") {
		document.getElementById('HighlightThese').value = findThese;
		hiliteNodeList(); // will pan and zoom to fit
	}
	// pre-pan and zoom if requested (will override any zoom-to-fit by hiliteNodeList)
	if(moveHereFirst!=null)
		moveHere(moveHereFirst);
	// draw any URL-requested labels and boxes
	if(labelThese.length>0) {
		for(var i=0;i<labelThese.length;i+=1)
			flashBoxLabel(labelThese[i]);
	}
	// grant focus to the chip display to enable zoom keys
	chipsurround.focus();
	chipsurround.onwheel = function(e){handleWheelZoom(e);};
	chipsurround.onmousedown = function(e){mouseDown(e);};
	chipsurround.onkeypress = function(e){handleKey(e);};
	chipsurround.onmouseout = function(e){mouseLeave(e);};
}