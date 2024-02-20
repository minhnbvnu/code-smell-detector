function d3_chart_bulletTranslate(x) {
  return function(d) {
    return "translate(" + x(d) + ",0)";
  };
}