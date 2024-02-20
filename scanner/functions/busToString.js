function busToString(busname){
	// takes a signal name or prefix
	// returns an appropriate string representation
	// some 'signal names' are CPU-specific aliases to user-friendly string output
	if(busname=='cycle')
		return cycle>>1;
	if(busname=='pc')
		return busToHex('pch') + busToHex('pcl');
	if(busname=='p')
		return readPstring();
	if(busname=='tcstate')
		return ['clock1','clock2','t2','t3','t4','t5'].map(busToHex).join("");
	if(busname=='State')
		return listActiveTCStates();
	if(busname=='TState')
		return allTCStates( true );
	if(busname=='Phi')
		// Pretty-printed phase indication based on the state of cp1,
                // the internal Phase 1 node
		return '&Phi;' +
		       (isNodeHigh( nodenames[ 'cp1' ] ) ? '1' : '2');
	if(busname=='Execute')
		return disassemblytoHTML(readBits('ir',8));
	if(busname=='Fetch')
		return isNodeHigh(nodenames['sync'])?disassemblytoHTML(readDataBus()):"";
	if(busname=='plaOutputs')
		// PLA outputs are mostly ^op- but some have a prefix too
		//    - we'll allow the x and xx prefix but ignore the #
		return listActiveSignals('^([x]?x-)?op-');
	if(busname=='DPControl')
		return listActiveSignals('^dpc[-]?[0-9]+_');
	if(busname[0]=="-"){
		// invert the value of the bus for display
		var value=busToHex(busname.slice(1))
		if(typeof value != "undefined")
			return value.replace(/./g,function(x){return (15-parseInt(x,16)).toString(16)});
		else
			return undefined;;
	} else {
		return busToHex(busname);
	}
}