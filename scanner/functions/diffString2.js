function diffString2( o, n ) {
  o = o.replace(/\s+$/, '');
  n = n.replace(/\s+$/, '');

  var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );

  var oSpace = o.match(/\s+/g);
  if (oSpace == null) {
    oSpace = ["\n"];
  } else {
    oSpace.push("\n");
  }
  var nSpace = n.match(/\s+/g);
  if (nSpace == null) {
    nSpace = ["\n"];
  } else {
    nSpace.push("\n");
  }

  var os = "";
  var colors = new Array();
  for (var i = 0; i < out.o.length; i++) {
      colors[i] = randomColor();

      if (out.o[i].text != null) {
          os += escape(out.o[i].text) + oSpace[i];
      } else {
          os += "<del>" + escape(out.o[i]) + oSpace[i] + "</del>";
      }
  }

  var ns = "";
  for (var i = 0; i < out.n.length; i++) {
      if (out.n[i].text != null) {
          ns += escape(out.n[i].text) + nSpace[i];
      } else {
          ns += "<ins>" + escape(out.n[i]) + nSpace[i] + "</ins>";
      }
  }

  return { o : os , n : ns };
}