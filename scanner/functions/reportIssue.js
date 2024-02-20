function reportIssue() {
  var slide = $("span#slideFile").text();
  var link  = issueUrl + encodeURIComponent('Issue with slide: ' + slide);
  window.open(link);
}