function needCLodop() {
  try {
    var ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i) != null) return true;
    if (ua.match(/iPhone|iPod/i) != null) return true;
    if (ua.match(/Android/i) != null) return true;
    if (ua.match(/Edge\D?\d+/i) != null) return true;

    var verTrident = ua.match(/Trident\D?\d+/i);
    var verIE = ua.match(/MSIE\D?\d+/i);
    var verOPR = ua.match(/OPR\D?\d+/i);
    var verFF = ua.match(/Firefox\D?\d+/i);
    var x64 = ua.match(/x64/i);
    if ((verTrident == null) && (verIE == null) && (x64 !== null))
      return true;
    else
    if (verFF !== null) {
      verFF = verFF[0].match(/\d+/);
      if ((verFF[0] >= 41) || (x64 !== null)) return true;
    } else
    if (verOPR !== null) {
      verOPR = verOPR[0].match(/\d+/);
      if (verOPR[0] >= 32) return true;
    } else
    if ((verTrident == null) && (verIE == null)) {
      var verChrome = ua.match(/Chrome\D?\d+/i);
      if (verChrome !== null) {
        verChrome = verChrome[0].match(/\d+/);
        if (verChrome[0] >= 41) return true;
      };
    };
    return false;
  } catch (err) {
    return true;
  };
}