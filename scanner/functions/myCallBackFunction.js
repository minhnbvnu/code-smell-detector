function myCallBackFunction (data) {
	// Updates seq_display with whatever ExtendScript function returns.
	var boilerPlate		= "Active Sequence: ";
	var seq_display		= document.getElementById("active_seq");
	seq_display.innerHTML	= boilerPlate + data;
}