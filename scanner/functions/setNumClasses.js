function setNumClasses(n)
{
	$("#county-map g").removeClass("q"+numClasses).addClass("q"+n);
	numClasses = n;
	drawColorChips();
	applyColors();
}