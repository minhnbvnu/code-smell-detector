function recalcNodeList(list){
	var n = list[0];
	recalclist = new Array();
	recalcHash = new Array();
	for(var j=0;j<100;j++){		// loop limiter
		if(list.length==0) return;
		if(ctrace) {
			var i;
			for(i=0;i<traceTheseNodes.length;i++) {
				if(list.indexOf(traceTheseNodes[i])!=-1) break;
			}
			if((traceTheseNodes.length==0)||(list.indexOf(traceTheseNodes[i])==-1)) {
				console.log('recalcNodeList iteration: ', j, list.length, 'nodes');
			} else {
				console.log('recalcNodeList iteration: ', j, list.length, 'nodes', list);
			}
		}
		list.forEach(recalcNode);
		list = recalclist;
		recalclist = new Array();
		recalcHash = new Array();
	}
	if(ctrace) console.log(n,'looping...');
}