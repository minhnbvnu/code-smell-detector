function visitAllLocations(){
	var missingLocations=setBooleans(BOTW_Data.LOCATIONS);
	MarcDialogs.alert(missingLocations+' unknown locations were visited');
}