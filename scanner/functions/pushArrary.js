function pushArrary($ele, isScript) {
    let array = [],
      prop = "href";

    isScript && (prop = "src");
    $ele.each(function() {
      array.push($(this).attr(prop));
    });
    return _.uniq(array);
  }