function addLocationsToMap(){
	var n = addToMap(BOTW_Data.LOCATIONS, SavegameEditor.Constants.ICON_TYPES.STAR);
	MarcDialogs.alert(n+' pins for missing locations added to map');
}