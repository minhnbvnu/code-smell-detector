function showState(str){
	var codes = {g: false, h: true, v: true, l: false};
	for(var i=0;i<str.length;i++){
		if(str[i]=='x') continue;
		var state = codes[str[i]];
		nodes[i].state = state;
		var gates = nodes[i].gates;
		gates.forEach(function(t){t.on=state;});
	}
	refresh();
}