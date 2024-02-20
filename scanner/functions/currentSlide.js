function currentSlide() {
	var cs;
	var footer_nodes;
	var vis = 'visible';
	if (document.getElementById) {
		cs = document.getElementById('currentSlide');
		footer_nodes = document.getElementById('footer').childNodes;
	} else {
		cs = document.currentSlide;
		footer = document.footer.childNodes;
	}
	cs.innerHTML = '<span id="csHere">' + snum + '<\/span> ' + 
		'<span id="csSep">\/<\/span> ' + 
		'<span id="csTotal">' + (smax-1) + '<\/span>';
	if (snum == 0) {
		vis = 'hidden';
	}
	cs.style.visibility = vis;
	for (var i = 0; i < footer_nodes.length; i++) {
		if (footer_nodes[i].nodeType == 1) {
			footer_nodes[i].style.visibility = vis;
		}
	}		
}