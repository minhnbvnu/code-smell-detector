function loadMasterMode(){
	if(!masterModeLoaded){
		var script=document.createElement('script');
		script.type='text/javascript';
		script.src='./zelda-botw.master.js';
		script.onload=function(){
			masterModeLoaded=true;
			document.getElementById('tab-button-master').disabled=false;
			//BOTWMasterEditor.prepare();
		};
		document.getElementsByTagName('head')[0].appendChild(script);
	}
}