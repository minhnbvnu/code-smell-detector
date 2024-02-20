function blankScreen()
{
  try {
    slaveWindow.blankScreen();
  }
  catch (e) {
    if ($('#screenblanker').length) { // if #screenblanker exists
        $('#screenblanker').slideUp('normal', function() {
            $('#screenblanker').remove();
        });
    } else {
        $('body').prepend('<div id="screenblanker"></div>');
        $('#screenblanker').slideDown();
    }
  }
}