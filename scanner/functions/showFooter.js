function showFooter(timeout) {
  timeout = (typeof timeout !== 'undefined') ?  timeout : 5000;

  if($('#footer').is(':hidden')) {
    $('#footer').show(200);

    window.setTimeout(function() {
      $('#footer').hide(200);
    }, timeout);
  }

}