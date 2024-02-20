function forEachCodeMirror(f) {
  if (!document.body.getElementsByClassName) { return }
  var byClass = document.body.getElementsByClassName("CodeMirror");
  for (var i = 0; i < byClass.length; i++) {
    var cm = byClass[i].CodeMirror;
    if (cm) { f(cm); }
  }
}