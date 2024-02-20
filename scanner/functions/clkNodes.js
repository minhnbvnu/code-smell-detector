function clkNodes(){
	var res = Array();
	res.push(943);
	for(var i in nodes[943].gates){
		var t = nodes[943].gates[i];
		if(t.c1==npwr) res.push(t.c2);
		if(t.c2==npwr) res.push(t.c1);
	}
	hiliteNode(res);
}