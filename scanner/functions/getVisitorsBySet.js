function getVisitorsBySet(sets) {
  var visitorsToInclude = sets.reduce(function(visitors, set) {
    if (!transformSets.hasOwnProperty(set)) {
      throw new Error('Unknown visitor set: ' + set);
    }
    transformSets[set].forEach(function(visitor) {
      visitors[visitor] = true;
    });
    return visitors;
  }, {});

  var visitorList = [];
  for (var i = 0; i < transformRunOrder.length; i++) {
    if (visitorsToInclude.hasOwnProperty(transformRunOrder[i])) {
      visitorList = visitorList.concat(transformVisitors[transformRunOrder[i]]);
    }
  }

  return visitorList;
}