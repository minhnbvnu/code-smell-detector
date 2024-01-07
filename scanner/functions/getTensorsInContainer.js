function getTensorsInContainer(result) {
	  var list = [];
	  var seen = new Set();
	  walkTensorContainer(result, list, seen);
	  return list;
	}