function turnTransistorOff(t){
	if(!t.on) return;
	if(ctrace && (traceTheseTransistors.indexOf(t.name)!=-1))
		console.log(t.name, 'off', t.gate, t.c1, t.c2);
	t.on = false;
	addRecalcNode(t.c1);
	addRecalcNode(t.c2);
}