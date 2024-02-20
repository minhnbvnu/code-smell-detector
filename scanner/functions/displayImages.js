function displayImages() {
	var s = "<p>";
	for(x=1;x<=7;x++) {
		var imageUrl = "file://" + localStorage.kittenLocalPath + "/kitten"+x+".jpg";
		s += "<img src='"+imageUrl+"'><br/>";
	}
	$imageDiv.html(s);
}