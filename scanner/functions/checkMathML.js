function checkMathML(){
  if (navigator.appName.slice(0,8)=="Netscape")
    if (navigator.appVersion.slice(0,1)>="5") noMathML = null;
    else noMathML = true;
  else if (navigator.appName.slice(0,9)=="Microsoft")
    try {
        var ActiveX = new ActiveXObject("MathPlayer.Factory.1");
        noMathML = null;
    } catch (e) {
        noMathML = true;
    }
  else if (navigator.appName.slice(0,5)=="Opera")
    if (navigator.appVersion.slice(0,3)>="9.5") noMathML = null;
  else noMathML = true;

  //noMathML = true; //uncomment to check
  if (noMathML && notifyIfNoMathML) {
    var msg = "To view the ASCIIMathML notation use Internet Explorer + MathPlayer or Mozilla Firefox 2.0 or later.";
    if (alertIfNoMathML)
       alert(msg);
    else return msg;
  }
}