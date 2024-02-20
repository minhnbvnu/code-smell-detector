function allNodes(){
	var res = new Array();
	var ii = 0;
	for(var i in nodes) {
		// Don't feed numeric strings to recalcNodeList(). Numeric
		// strings can cause a (data dependent) duplicate node number
		// hiccup when accumulating a node group's list, ie:
		// group => [ "49", 483, 49 ]
		ii = Number( i );
		if((ii!=npwr)&&(ii!=ngnd)) res.push(ii);
	}
	return res;
}