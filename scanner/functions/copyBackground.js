function copyBackground(source, target) {
  // to get this to properly copy over in Firefox, we need to iterate each property instead of using shorthand
  ['background-color',
   'background-image',
   'background-repeat',
   'background-position',
   'background-attachment'].forEach(function(property) {
    target.css(property, source.css(property));
  })

  // we have to do this separately so we can transform it
  var bgsize = source.css('background-size');

  var regex = /^(\d+)(\S{1,2})(?: (\d+)(\S{1,2}))?$/;
  var match = regex.exec(bgsize);
  if(match) {
    var width  = match[1];
    var unit_w = match[2];
    var height = match[3] || '';
    var unit_h = match[4] || '';

    if(unit_w != '%'                 ) { width  /= 2 };
    if(unit_h != '%' && height != '' ) { height /= 2 };

    target.css('background-size', width+unit_w+' '+height+unit_h);
  }
  else {
    // contain, cover, etc
    target.css('background-size', bgsize);
  }
}