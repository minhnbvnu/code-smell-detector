function LMisMathMLavailable() {
  if (navigator.appName.slice(0,8)=="Netscape")
    if (navigator.appVersion.slice(0,1)>="5") return null;
    else return LMnoMathMLNote();
  else if (navigator.appName.slice(0,9)=="Microsoft")
    try {
        var ActiveX = new ActiveXObject("MathPlayer.Factory.1");
        return null;
    } catch (e) {
        return LMnoMathMLNote();
    }
  else return LMnoMathMLNote();
}