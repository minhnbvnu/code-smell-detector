function changeImage(e) {
	// reset the classes to change the image's dimensions
	var theClass = classes[imageIndex++];
	$.resetClass($.theImage, theClass);

	// reset imageIndex if necessary
	if (imageIndex >= classes.length) { imageIndex = 0; }
}