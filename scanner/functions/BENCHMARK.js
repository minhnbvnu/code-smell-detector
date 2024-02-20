function BENCHMARK(desc, isFinished) {
	var places = Math.pow(10, 5);
	desc = desc || '<no description>';
	if (times.first === null) {
		times.first = process.hrtime();
		return;
	}

	function hrtimeInSeconds(t) {
		return t[0] + (t[1] / 1000000000);
	}

	var total = process.hrtime(times.first);
	var current = hrtimeInSeconds(total) - (times.last ? hrtimeInSeconds(times.last) : 0);
	times.last = total;
	var thisTime = Math.round((isFinished ? hrtimeInSeconds(total) : current) * places) / places;
	times.msgs.push('[' + thisTime + 's] ' + desc);
	if (isFinished) {
		logger.trace(' ');
		logger.trace('Benchmarking');
		logger.trace('------------');
		logger.trace(times.msgs);
		logger.info('');
		logger.info('Alloy compiled in ' + thisTime + 's');
	}
}