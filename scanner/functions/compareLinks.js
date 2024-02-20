function compareLinks($links) {
    let $currentStyles = $("link"),
      slideoutStyles = pushArrary($links),
      currentStyles = pushArrary($currentStyles),
      styleDiff = _.difference(slideoutStyles, currentStyles);

    return styleDiff;
  }