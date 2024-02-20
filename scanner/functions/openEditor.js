function openEditor() {
  var slide = $("span#slideFile").text().replace(/:\d+$/, '');
  var link  = 'edit/' + slide + ".md";
  $.get(link);
}