function selectCell(n){
	unselectCell();
	if(n>=0x200) return;
	cellEl(n).style.background = '#ff8';
	selected = n;
	table.onkeydown = function(e){cellKeydown(e);};
}