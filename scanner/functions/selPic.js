function selPic() {
	navigator.camera.getPicture(function(f) {
		var newHtml = "<img src='"+f+"'>";
		$imagesDiv.append(newHtml);
		images.push(f);
		if(images.length === 1) {
			$("#uploadPictures").removeAttr("disabled");
		}
	}, function(e) {
		alert("Error, check console.");
		console.dir(e);
	}, { 
		quality: 50,
		sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
		destinationType: Camera.DestinationType.FILE_URI
	});
	
}