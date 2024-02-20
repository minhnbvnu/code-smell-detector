function setupParams(){
	if(location.search=="")
		return
	var queryParts=location.search.slice(1).split('&');
	var panx;
	var pany;
	var zoom;
	var userAddress;
	for(var i=0;i<queryParts.length;i++){
		var params=queryParts[i].split("=");
		if(params.length!=2){
			if(loglevel>0)
				console.log('malformed parameters',params);
			break;
		}
		var name=params[0];
		var value=params[1].replace(/\/$/,""); // chrome sometimes adds trailing slash
		// be (relatively) forgiving in what we accept
		//
		// user interface mode control
		if(name=="loglevel" && parseInt(value)!=NaN){
			updateLoglevel(value);
		} else if(name=="logmore" && value!=""){
			updateLogList(value);
		} else if(name=="headlesssteps" && parseInt(value)!=NaN){
			headlessSteps=parseInt(value);
		} else if(name=="graphics" && value.indexOf("f")==0){
			updateChipLayoutVisibility(false);
		} else if(name=="canvas" && parseInt(value)!=NaN){
			grCanvasSize=value;
		// suppress simulation (for layout viewing only on slow browsers)
		} else if(name=="nosim" && value.indexOf("t")==0){
			noSimulation=true;
		} else
		// place the graphics window at a point of interest
		if(name=="panx" && parseInt(value)!=NaN){
			panx=parseInt(value);
		} else if(name=="pany" && parseInt(value)!=NaN){
			pany=parseInt(value);
		} else if(name=="zoom" && parseInt(value)!=NaN){
			zoom=parseInt(value);
		} else
		// perform a search, highlight and zoom to object(s)
		if(name=="find" && value.length>0){
			findThese=value;
		} else
		// affix label with optional box to highlight an area of interest
		if(name=="label" && value.length>0){
			labelThese.push(value.split(","));
		} else
		// load a test program: Address, Data and Reset
		if(name=="a" && parseInt(value,16)!=NaN){
			userAddress=parseInt(value,16);
		} else if(name=="d" && value.match(/[0-9a-fA-F]*/)[0].length==value.length){
			for(var j=0;j<value.length;j+=2)
				userCode[userAddress++]=parseInt(value.slice(j,j+2),16);
		} else if(name=="r" && parseInt(value,16)!=NaN){
			userResetLow=parseInt(value,16)%256;
			userResetHigh=(parseInt(value,16)>>8)%256;
		} else
		// setup input pin events, breakpoints, watchpoints
		if(name=="reset0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow(nodenamereset);"].join("");
		} else if(name=="reset1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh(nodenamereset);"].join("");
		} else if(name=="irq0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow('irq');"].join("");
		} else if(name=="irq1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh('irq');"].join("");
		} else if(name=="nmi0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow('nmi');"].join("");
		} else if(name=="nmi1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh('nmi');"].join("");
		} else if(name=="rdy0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow('rdy');"].join("");
		} else if(name=="rdy1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh('rdy');"].join("");
		} else if(name=="so0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow('so');"].join("");
		} else if(name=="so1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh('so');"].join("");
		// Some Z80 inputs - we can refactor if this becomes unwieldy
		} else if(name=="int0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow('int');"].join("");
		} else if(name=="int1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh('int');"].join("");
		} else if(name=="wait0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow('wait');"].join("");
		} else if(name=="wait1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh('wait');"].join("");
		} else if(name=="busrq0" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setLow('busrq');"].join("");
		} else if(name=="busrq1" && parseInt(value)!=NaN){
			clockTriggers[value]=[clockTriggers[value],"setHigh('busrq');"].join("");
		//
		} else if(name=="time" && parseInt(value)!=NaN){
			eventTime=value;
		} else if(name=="databus" && parseInt(value)!=NaN){
			clockTriggers[eventTime]=[clockTriggers[eventTime],"writeDataBus(0x"+value+");"].join("");
		} else
		// run a test program, and optionally check against a golden checksum
		if(name=="steps" && parseInt(value)!=NaN){
			userSteps=parseInt(value);
			running=true;
		} else if(name=="checksum" && parseInt(value,16)!=NaN){
			goldenChecksum=(0x100000000+parseInt(value,16)).toString(16).slice(-8);
		} else {
			if(loglevel>0)
				console.log('unrecognised parameters:',params);
			break;
		}
	}
	if(panx!=null && pany!=null && zoom!=null)
		moveHereFirst=[panx,pany,zoom];
}