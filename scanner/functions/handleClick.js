function handleClick(e){
	var x = localx(hilite, e.clientX)/zoom;
	var y = localy(hilite, e.clientY)/zoom;
	var w = findNodeNumber(x,y);
	if(e.shiftKey) {
		getNodeGroup(w);
		hiliteNode(group);
	}
	else {var a=new Array(); a.push(w); hiliteNode(a);}
        var cx = Math.round(x*grChipSize/600);
        var cy = Math.round(y*grChipSize/600);
	if(w==-1) setStatus('x:',cx,'<br>','y:',cy);
	else {
		var s1='x: ' + cx + ' y: ' + cy;
                var s2='node: ' + w + ' ' + nodeName(w);
                setStatus(s1, s2);
	}
}