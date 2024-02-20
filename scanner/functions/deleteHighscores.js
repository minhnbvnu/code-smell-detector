function deleteHighscores(storageName){
  if (typeof(Storage) === "undefined") {
	console.log("html5 localStorage is not available on your device");
	return;
  }
  var scores =[];
  if(localStorage[storageName]){
	localStorage[storageName] = JSON.stringify(scores);
  }
  console.log("deleteHighscores: storageName=",storageName,
	      "\n localStorage[storageName]=", localStorage[storageName],
	      "\n localStorage=",localStorage);
}