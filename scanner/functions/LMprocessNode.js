function LMprocessNode(n, linebreaks, spanclassLM) {
  var frag,st;
  if (spanclassLM!=null) {
    frag = document.getElementsByTagName("span")
    for (var i=0;i<frag.length;i++)
      if (frag[i].className == "LM")
        LMprocessNodeR(frag[i],linebreaks);
  } else {
    try {
      st = n.innerHTML;
    } catch(err) {}
// DELIMITERS:
    if (st==null || st.indexOf("\$")!=-1)
      LMprocessNodeR(n,linebreaks);
  }
  if (isIE) { //needed to match size and font of formula to surrounding text
    frag = document.getElementsByTagName('math');
    for (var i=0;i<frag.length;i++) frag[i].update()
  }
}