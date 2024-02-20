function setupPreShow(seconds) {
  preshow_stop = secondsFromNow(seconds);
  try { presenterView.preshow_stop = preshow_stop } catch (e) {}

  // footer styling looks icky. Hide it for now.
  $('#footer').hide();

  $.getJSON("preshow_files", false, function(data) {
    $('#preso').after("<div id='preshow'></div><div id='tips'></div><div id='preshow_timer'></div>");
    $.each(data, function(i, n) {
      if(n == "preshow.json") {
        // has a descriptions file
        $.getJSON("file/_preshow/preshow.json", false, function(data) {
          preshow_des = data;
        })
      } else {
        $('#preshow').append('<img ref="' + n + '" src="file/_preshow/' + n + '" class="preshow" />');
      }
    })
    preshow_images      = $('#preshow > img');
    preshow_imagesTotal = preshow_images.size();

    startPreShow();
  });
}