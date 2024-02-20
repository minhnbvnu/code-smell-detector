function AMprocessNode(n, linebreaks, spanclassAM) {
  var frag,st;
  if (spanclassAM!=null) {
    frag = document.getElementsByTagName("span");
    for (var i=0;i<frag.length;i++)
      if (frag[i].className == "AM")
        AMprocessNodeR(frag[i],linebreaks);
  } else {
    try {
      st = n.innerHTML;
    } catch(err) {}
    if (st==null ||
        st.indexOf(config.AMdelimiter1)!=-1)// || st.indexOf(config.AMdelimiter2)!=-1)
      AMprocessNodeR(n,linebreaks);
  }
}