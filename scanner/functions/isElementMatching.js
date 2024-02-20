function isElementMatching(element, needle) {
    var name = $(element).text().toLowerCase();
    var alternativesStr = element.attr("data-alternative-names") || '';
    var alternatives = alternativesStr.toLowerCase().split(',');
    var possibilities = [name].concat(alternatives);
    var emPossibilities = possibilities.map(function(possibility) {
      return 'em-' + possibility;
    });
    var allPossibilities = possibilities.concat(emPossibilities);

    return allPossibilities.some(function(e) {
      return e.indexOf(needle) >= 0;
    });
  }