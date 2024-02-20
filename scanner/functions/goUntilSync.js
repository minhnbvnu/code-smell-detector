function goUntilSync(){
	halfStep();
	while(!isNodeHigh(nodenames['sync']) || isNodeHigh(nodenames['clk0']))
		halfStep();
}