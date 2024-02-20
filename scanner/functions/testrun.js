function testrun(testCases) {
	var ran = 0;
	for (t in testCases) {
		var result = testCases[t]();
		ran++;
	}
	
	return testrun.reportOut+"-------------------------------\n"+((testrun.fails>0)? ":( Failed "+testrun.fails+"/" : ":) Passed all ")+testrun.count+" test"+((testrun.count == 1)? "":"s")+".\n";
}