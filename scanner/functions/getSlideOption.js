function getSlideOption(option) {
  var classes = currentSlide.attr('class').split(' ');

  for (var i=0; i < classes.length; i++) {
    var item = classes[i].split('=');
    if(item.length == 2 && item[0] == option) {
      return item[1]
    }
  }
}