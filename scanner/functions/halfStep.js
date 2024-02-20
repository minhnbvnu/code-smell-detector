function halfStep(){
	var clk = isNodeHigh(nodenames['clk0']);
	if (clk) {setLow('clk0'); handleBusRead(); } 
	else {setHigh('clk0'); handleBusWrite();}
	eval(clockTriggers[cycle+1]);  // pre-apply next tick's inputs now, so the updates are displayed

}