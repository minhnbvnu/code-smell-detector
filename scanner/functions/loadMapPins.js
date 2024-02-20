function loadMapPins(){
	// Read Pin Types
	var count = 0;
	iterateMapPins(function(val){
		if (val == 0xffffffff){
			return false;
		}
		count++;
		//console.log(count, val)
		return true;
	})
	// to debug saved locations
	// var i = 0;
	// iterateMapPinLocations(function(val, offset){
	// 	if (i % 3 == 0){
	// 		console.log("-----")
	// 		if (val == -100000){
	// 			return false;
	// 		}
	// 	}
	// 	i++
	// 	console.log(val)
	// 	return true
	// })
	mapPinCount = count;
	setValue('number-map-pins', count);
}