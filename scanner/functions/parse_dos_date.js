function parse_dos_date(buf) {
	var hms = buf.read_shift(2) & 0xFFFF;
	var ymd = buf.read_shift(2) & 0xFFFF;
	var val = new Date();
	var d = ymd & 0x1F; ymd >>>= 5;
	var m = ymd & 0x0F; ymd >>>= 4;
	val.setMilliseconds(0);
	val.setFullYear(ymd + 1980);
	val.setMonth(m-1);
	val.setDate(d);
	var S = hms & 0x1F; hms >>>= 5;
	var M = hms & 0x3F; hms >>>= 6;
	val.setHours(hms);
	val.setMinutes(M);
	val.setSeconds(S<<1);
	return val;
}