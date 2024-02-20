function currentSlideFromName(name) {
  var count = 0;
  if(name.length > 0 ) {
  	slides.each(function(s, slide) {
      if (name == $(slide).attr("id") ) {
        found = count;
        return false;
      }
  	  if (name == $(slide).find(".content").attr("ref") ) {
  	    found = count;
  	    return false;
  	  }
      var dataSection = $(slide).attr("data-section").toLowerCase();
      // firstText is usually a header for the slide
      var firstText = $(slide).find(".content :first").text().replace(/[\W]+/g, '-').replace(/-+$/, '').toLowerCase();
      var decodedName = decodeURIComponent(name).toLowerCase();
      if (decodedName == dataSection+'/'+firstText
          || name == dataSection
          || decodedName == firstText  ) {
        found = count;
        return false;
      }
  	  count++;
  	});
	}
	return count;
}