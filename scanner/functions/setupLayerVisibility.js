function setupLayerVisibility(){
	var x=document.getElementById('updateShow');
	for (var i=0;i<x.childNodes.length;i++) {
		if(x.childNodes[i].type='checkbox'){
			x.childNodes[i].checked=drawlayers[x.childNodes[i].name];
		}
	}
}