function setupCamera() {
	
	var renderPic = function(data) {
		var image = document.getElementById('myImage');
		image.src = "data:image/jpeg;base64," + data;		
	};
	
	var cameraError = function(err) {
		console.log('[camera error]',err);	
	};
	
	document.querySelector('#testCameraExisting').addEventListener('click', function() {
		
		navigator.camera.getPicture(renderPic, cameraError, {
			sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
			destinationType:Camera.DestinationType.DATA_URL
		});
		
	});

	document.querySelector('#testCameraNew').addEventListener('click', function() {
		
		navigator.camera.getPicture(renderPic, cameraError, {
			sourceType:Camera.PictureSourceType.CAMERA,
			destinationType:Camera.DestinationType.DATA_URL
		});
		
	});

}