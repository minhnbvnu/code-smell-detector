function recalcNode(node){
	if(node==ngnd) return;
	if(node==npwr) return;
	getNodeGroup(node);
	var newState = getNodeValue();
	if(ctrace && (traceTheseNodes.indexOf(node)!=-1))
		console.log('recalc', node, group);
	group.forEach(function(i){
		var n = nodes[i];
		if(n.state==newState) return;
		n.state = newState;
		n.gates.forEach(function(t){
			if(n.state) turnTransistorOn(t);
			else turnTransistorOff(t);});
	});
}