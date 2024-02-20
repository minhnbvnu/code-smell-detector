function doCam() {
	console.dir(device);
	var sourceType = device.isVirtual ? Camera.PictureSourceType.PHOTOLIBRARY:Camera.PictureSourceType.CAMERA;
	
	navigator.camera.getPicture(picDone, picFail, {
		sourceType: sourceType,
		destinationType:Camera.DestinationType.FILE_URI
	});	
}