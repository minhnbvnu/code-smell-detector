function updateChipLayoutAnimation(isOn){
	// simulation is much faster if we don't update the chip layout on every step
	animateChipLayout=isOn;
	document.getElementById('animateModeCheckbox').checked = animateChipLayout;
}