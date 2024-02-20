function determineIncremental()
{
	incrCurr = 0
	incrCode = false
	incrElem = currentSlide.find(".incremental li")
	incrSteps = incrElem.size()
	if(incrSteps == 0) {
		// also look for commandline
		incrElem = currentSlide.find(".incremental > pre > code > code")
		incrSteps = incrElem.size()
		incrCode = true
	}
	incrElem.each(function(s, elem) {
		$(elem).addClass('incremental hidden');
	})
}