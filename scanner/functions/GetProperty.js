function GetProperty(e,p) {
  var dv = doc.defaultView, pc = p.replace(/\-([a-z])/g,function(a){return a.charAt(1).toUpperCase()});
  return (dv && dv.getComputedStyle && dv.getComputedStyle(e,null).getPropertyValue(p)) ||
    (e.currentStyle && e.currentStyle[pc]);
}