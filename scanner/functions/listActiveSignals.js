function listActiveSignals(pattern){
	var r=new RegExp(pattern);
	var list=[];
	for(var i in nodenamelist){
		if(r.test(nodenamelist[i])) {
			if(isNodeHigh(nodenames[nodenamelist[i]]))
				// also map hyphen to a non-breaking version
				list.push(nodenamelist[i].replace(r,'').replace(/-/g,'&#8209'));
		}
	}
	return list;
}