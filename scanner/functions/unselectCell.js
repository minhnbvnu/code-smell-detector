function unselectCell(){
	if(selected==undefined) return;
	cellEl(selected).style.background = '#fff';
	selected = undefined;
	window.onkeydown = undefined;
}