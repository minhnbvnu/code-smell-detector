function chooseLayout(layout)
{
  // yay for half-baked data storage schemes
  layout = layout || document.cookieHash['layout'] || 'default';

  // in case we're being called externally, make the UI match
  $('#layoutSelector').val(layout);
  $("#nextWindowConfirmation").hide();
  console.log("Setting layout to " + layout);

  // change focus so we don't inadvertently change layout again by changing slides
  $("#preview").focus();
  $("#layoutSelector").blur();

  // what we are switching *from*
  switch(mode.layout) {
    case 'thumbs':
      $('#preview').removeClass('thumbs');
      $('#preview .thumb').hide();
      break;

    case 'beside':
      $('#preview').removeClass('beside');
      $('#preview #nextSlide .container').removeAttr("style");
      $('#preview #nextSlide').hide();
      break;

    case 'floating':
      try {
        if (nextWindow) {
          // unregister the event so we don't accidentally double-fire
          nextWindow.window.onunload = null;
          nextWindow.close();
        }
      }
      catch (e) {
        console.log(e);
        console.log('Next window failed to close properly.');
      }
      break;

    default:

  }

  // what we are switching *to*
  switch(layout) {
    case 'thumbs':
      $('#preview').addClass('thumbs');
      $('#preview .thumb').show();
      break;

    case 'beside':
      $('#preview').addClass('beside');
      $('#preview #nextSlide').show();

      var w = $('#nextSlide .container').width();
      $('#nextSlide .container').height(w*.75)
      break;

    case 'floating':
      $("#nextWindowConfirmation").show();
      break;

    default:

  }

  document.cookie = "layout="+layout
  mode.layout = layout;
  zoom(true);
}