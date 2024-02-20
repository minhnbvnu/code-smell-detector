function toggleAnnotations() {
  mode.annotations = $("#annotationsToggle").prop("checked");

  if(mode.annotations) {
    $('#annotationToolbar').show();
    $('canvas.annotations').show();
    if (typeof(currentSlide) != 'undefined') {
      currentSlide.find('canvas.annotations').annotate(annotations);
    }
  }
  else {
    $('#annotationToolbar').hide();
    $('canvas.annotations').stopAnnotation();
    $('canvas.annotations').hide();
  }
}