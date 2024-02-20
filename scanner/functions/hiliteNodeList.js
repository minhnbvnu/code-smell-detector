function hiliteNodeList(){
	var tmplist = document.getElementById('HighlightThese').value.split(/[\s,]+/);
	if(tmplist.join("").length==0){
		// request to highlight nothing, so switch off any signal highlighting
		hiliteNode(-1);
		return;
	}
	highlightThese = [];
	var seglist=[];
	var report="";
	for(var i=0;i<tmplist.length;i++){
		// get a node number from a signal name or a node number
		var name = tmplist[i];
		var value = parseInt(tmplist[i]);
		if((value!=NaN) && (typeof nodes[value] != "undefined")) {
			highlightThese.push(value);
			report="node: " + value + ' ' + nodeName(value);
			for(var s in nodes[value].segs)
				seglist.push(nodes[value].segs[s]);
		} else if(typeof nodenames[name] != "undefined") {
			highlightThese.push(nodenames[name]);
			report="node: " + nodenames[name] + ' ' + name;
			for(var s in nodes[nodenames[name]].segs)
				seglist.push(nodes[nodenames[name]].segs[s]);
		} else if(typeof transistors[name] != "undefined") {
			// normally we push numbers: a non-number is a transistor name
			highlightThese.push(name);
			report="transistor: " + name;
			seglist.push([
				transistors[name].bb[0],transistors[name].bb[2],
				transistors[name].bb[1],transistors[name].bb[3]
			]);
		} else {
			// allow match of underscore-delimited components, so
			// SUMS and dpc17 both match the node dpc17_SUMS
			for(var i in nodenames){
				re=new RegExp("(^" + name + "_|_" + name + "$)");
				if (re.test(i)){
					value = nodenames[i];
					highlightThese.push(value);
					report="node: " + value + ' ' + nodeName(value);
					for(var s in nodes[value].segs)
						seglist.push(nodes[value].segs[s]);
					break;
				}
			}
		}
	}
	if(highlightThese.length==0){
		setStatus('Find: nothing found!','(Enter a list of nodenumbers, names or transistor names)');
		return;
	} else if (highlightThese.length==1){
		setStatus('Find results:',report);
	} else {
		setStatus('Find: multiple objects found','(' + highlightThese.length + ' objects)');
	}
	var xmin=seglist[0][0], xmax=seglist[0][0];
	var ymin=seglist[0][1], ymax=seglist[0][1];
	for(var s in seglist){
		for(var i=0;i<seglist[s].length;i+=2){
			if(seglist[s][i]<xmin) xmin=seglist[s][i];
			if(seglist[s][i]>xmax) xmax=seglist[s][i];
			if(seglist[s][i+1]<ymin) ymin=seglist[s][i+1];
			if(seglist[s][i+1]>ymax) ymax=seglist[s][i+1];
		}
	}
	zoomToBox(xmin,xmax,ymin,ymax);
	updateLinkHere();
	clearHighlight();  // nullify the simulation overlay (orange/purple)
	hiliteNode(-1);    // unhighlight all nodes
	setTimeout("hiliteNode(highlightThese);", 400);
	setTimeout("hiliteNode(-1);", 800);
	setTimeout("hiliteNode(highlightThese);", 1200);
}