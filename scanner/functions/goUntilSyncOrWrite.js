function goUntilSyncOrWrite(){
	halfStep();
	cycle++;
	while(
		!isNodeHigh(nodenames['clk0']) ||
		( !isNodeHigh(nodenames['sync']) && isNodeHigh(nodenames['rw']) )
	) {
		halfStep();
		cycle++;
	}
	chipStatus();
}