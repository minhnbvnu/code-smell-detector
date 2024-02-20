function AMstrarr2docFrag(arr, linebreaks) {
  var newFrag=document.createDocumentFragment();
  var expr = false;
  for (var i=0; i<arr.length; i++) {
    if (expr) newFrag.appendChild(AMparseMath(arr[i]));
    else {
      var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
      newFrag.appendChild(document.createElement("span").
      appendChild(document.createTextNode(arri[0])));
      for (var j=1; j<arri.length; j++) {
        newFrag.appendChild(document.createElement("p"));
        newFrag.appendChild(document.createElement("span").
        appendChild(document.createTextNode(arri[j])));
      }
    }
    expr = !expr;
  }
  return newFrag;
}