function setTimeMethods() {
	var useUTC = defaultOptions.global.useUTC,
		GET = useUTC ? 'getUTC' : 'get',
		SET = useUTC ? 'setUTC' : 'set';

	makeTime = useUTC ? Date.UTC : function (year, month, date, hours, minutes, seconds) {
		return new Date(
			year,
			month,
			pick(date, 1),
			pick(hours, 0),
			pick(minutes, 0),
			pick(seconds, 0)
		).getTime();
	};
	getMinutes =  GET + 'Minutes';
	getHours =    GET + 'Hours';
	getDay =      GET + 'Day';
	getDate =     GET + 'Date';
	getMonth =    GET + 'Month';
	getFullYear = GET + 'FullYear';
	setMinutes =  SET + 'Minutes';
	setHours =    SET + 'Hours';
	setDate =     SET + 'Date';
	setMonth =    SET + 'Month';
	setFullYear = SET + 'FullYear';

}