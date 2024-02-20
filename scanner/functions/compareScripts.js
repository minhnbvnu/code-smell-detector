function compareScripts($scripts) {
    let $currentPageScripts = $("script"),
      slideoutScripts = pushArrary($scripts, true),
      currentPageScripts = pushArrary($currentPageScripts, true),
      scriptDiff = _.difference(slideoutScripts, currentPageScripts);
    return scriptDiff;
  }