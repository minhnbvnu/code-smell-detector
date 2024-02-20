function chipStatus(){
	var ab = readAddressBus();
	var machine1 =
	        ' halfcyc:' + cycle +
	        ' phi0:' + readBit('clk0') +
                ' AB:' + hexWord(ab) +
	        ' D:' + hexByte(readDataBus()) +
	        ' RnW:' + readBit('rw');
	var machine2 =
	        ' PC:' + hexWord(readPC()) +
	        ' A:' + hexByte(readA()) +
	        ' X:' + hexByte(readX()) +
	        ' Y:' + hexByte(readY()) +
	        ' SP:' + hexByte(readSP()) +
	        ' ' + readPstring();
	var machine3 = 
		'Hz: ' + estimatedHz().toFixed(1);
	if(typeof expertMode != "undefined") {
		machine3 += ' Exec: ' + busToString('Execute') + '(' + busToString('State') + ')';
		if(isNodeHigh(nodenames['sync']))
			machine3 += ' (Fetch: ' + busToString('Fetch') + ')';
		if(goldenChecksum != undefined)
			machine3 += " Chk:" + traceChecksum + ((traceChecksum==goldenChecksum)?" OK":" no match");
	}
	setStatus(machine1, machine2, machine3);
	if (logThese.length>1) {
		updateLogbox(logThese);
	}
	selectCell(ab);
}