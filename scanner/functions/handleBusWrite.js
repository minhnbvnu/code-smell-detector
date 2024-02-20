function handleBusWrite(){
	if(!isNodeHigh(nodenames['rw'])){
		var a = readAddressBus();
		var d = readDataBus();
		eval(writeTriggers[a]);
		mWrite(a,d);
		if(a<0x200) setCellValue(a,d);
	}
}