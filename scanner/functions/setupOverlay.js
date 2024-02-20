function setupOverlay(){
	overlay = document.getElementById('overlay');
	overlay.width = grCanvasSize;
	overlay.height = grCanvasSize;
	ctx = overlay.getContext('2d');
}