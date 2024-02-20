function addNodeToGroup(i){
	if(group.indexOf(i) != -1) return;
	group.push(i);
	if(i==ngnd) return;
	if(i==npwr) return;
	nodes[i].c1c2s.forEach(
		function(t){
			if(!t.on) return;
			var other;
			if(t.c1==i) other=t.c2;
			if(t.c2==i) other=t.c1;
			addNodeToGroup(other);});
}