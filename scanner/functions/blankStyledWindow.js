function blankStyledWindow(title, dimensions, classes, resizable) {
  // yes, the explicit address is needed. Because Chrome.
  var opts = "status=0,toolbar=0,location=0,menubar=0,"+dimensions;
  if(resizable) {
    opts += ",resizable=1,scrollbars=1";
  }
  newWindow = window.open('about:blank','', opts);

  // allow time for the window to load for Firefox and IE
  window.setTimeout(function() {
    newWindow.document.title = title;

    // IE is terrible and will explode if you try to add a DOM element to another
    // document. Instead, serialize everything into STRINGS and let jquery rebuild
    // them into elements again in the context of the other document.
    // Because IE.

    $(newWindow.document.head).append('<base href="' + location.origin + location.root + '"/>');
    $('link[rel="stylesheet"]').each(function() {
      var href  = $(this).attr('href');
      var style = '<link rel="stylesheet" type="text/css" href="' + href + '">'
      $(newWindow.document.head).append(style);
    });

    $(newWindow.document.body).addClass('floating');
    if(classes) {
      $(newWindow.document.body).addClass(classes);
    }

  }, 500);

  return newWindow;
}