function listActiveTCStates() {
	var s=[];
	if(!isNodeHigh(nodenames['clock1']))	s.push("T0");
	if(!isNodeHigh(nodenames['clock2']))	s.push("T1");
	if(!isNodeHigh(nodenames['t2']))	s.push("T2");
	if(!isNodeHigh(nodenames['t3']))	s.push("T3");
	if(!isNodeHigh(nodenames['t4']))	s.push("T4");
	if(!isNodeHigh(nodenames['t5']))	s.push("T5");
	return s.join("+");
}