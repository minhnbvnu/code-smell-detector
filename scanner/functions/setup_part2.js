function setup_part2(){
	frame = document.getElementById('frame');
	statbox = document.getElementById('status');
	setupNodes();
	setupTransistors();
	setupLayerVisibility();
	setupBackground();
	setupOverlay();
	setupHilite();
	setupHitBuffer();
	recenter();
	refresh();
	setupTable();
	window.onkeypress = function(e){handleKey(e);}
	hilite.onmousedown = function(e){mouseDown(e);}
	setStatus('resetting 6502...');
	setTimeout(setup_part3, 0);
}