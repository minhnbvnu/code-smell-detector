function hideWarning(){
	var body = document.getElementsByTagName("body")[0];
	body.removeChild(document.getElementById('AMMLwarningBox'));
	body.onclick = null;
}