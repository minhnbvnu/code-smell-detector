function editSlide() {
  var slide = $("span#slideFilename").text().replace(/\/\d+$/, '');
  var link  = editUrl + slide + ".md";
  window.open(link);
}