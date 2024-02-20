function showTab(newTab){
	currentTab=newTab;
	for(var i=0; i<availableTabs.length; i++){
		document.getElementById('tab-button-'+availableTabs[i]).className=currentTab===availableTabs[i]?'tab-button active':'tab-button';
		document.getElementById('tab-'+availableTabs[i]).style.display=currentTab===availableTabs[i]?'block':'none';
	}
	
	document.getElementById('add-item-button').style.display=(newTab==='home' || newTab==='horses' || newTab==='master')? 'none':'block';

	if(newTab==='master'){
		if(BOTWMasterEditor.isLoaded())
			BOTWMasterEditor.refreshResults();
		else
			BOTWMasterEditor.loadHashes();
	}
}