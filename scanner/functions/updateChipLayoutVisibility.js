function updateChipLayoutVisibility(isOn){
	chipLayoutIsVisible=isOn;
	if(chipLayoutIsVisible) {
		updateChipLayoutAnimation(true);
		// resize the two panes appropriately
		$("#frame").trigger("resize", [ 810 ]);
		$("#rightcolumn").trigger("resize", [ 738 - 180 ]);
		// replace the Show Chip button with the chip graphics
		chipsurround=document.getElementById('chipsurround');
		chipsurround.style.display = 'block';
		document.getElementById('layoutControlPanel').style.display = 'block';
		document.getElementById('nochip').style.display = 'none';
		// allow the browser to respond while we load the graphics
		setStatus('loading graphics...');
		setTimeout(setupChipLayoutGraphics, 0);
	} else {
		// cannot animate the layout if there is no canvas
		updateChipLayoutAnimation(false);
		// resize the two panes appropriately
		$("#frame").trigger("resize", [ 120 ]);
		$("#rightcolumn").trigger("resize", [ 200 ]);
		// replace the layout display with a button to show it
		document.getElementById('chipsurround').style.display = 'none';
		document.getElementById('layoutControlPanel').style.display = 'none';
		document.getElementById('nochip').style.display = 'block';
	}
}