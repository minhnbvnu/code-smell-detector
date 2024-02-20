function loadSlides(load_slides, reload, hard) {
  var url = "slides";
  if (reload) {
    url += "?cache=clear";
  }

  //load slides offscreen, wait for images and then initialize
  $('body').addClass('busy');
  if (load_slides) {
    $("#slides").load(url, false, function(){
      if(hard) {
        location.reload(true);
      }
      else {
        $("#slides img").batchImageLoad({
          loadingCompleteCallback: initializePresentation()
        });
      }
    })
  } else {
    $("#slides img").batchImageLoad({
      loadingCompleteCallback: initializePresentation()
    })
  }
}