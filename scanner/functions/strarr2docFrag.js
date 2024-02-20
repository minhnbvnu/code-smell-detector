function strarr2docFrag(arr, linebreaks, latex) {
  var newFrag=document.createDocumentFragment();
  var expr = false;
  for (var i=0; i<arr.length; i++) {
    if (expr) newFrag.appendChild(parseMath(arr[i],latex));
    else {
      var arri = (linebreaks ? arr[i].split("\n\n") : [arr[i]]);
      newFrag.appendChild(createElementXHTML("span").
      appendChild(document.createTextNode(arri[0])));
      for (var j=1; j<arri.length; j++) {
        newFrag.appendChild(createElementXHTML("p"));
        newFrag.appendChild(createElementXHTML("span").
        appendChild(document.createTextNode(arri[j])));
      }
    }
    expr = !expr;
  }
  return newFrag;
}