function getMilestoneLink(minor_ver) {
  return "https://github.com/cytoscape/cytoscape.js/issues?q=milestone%3A".concat(minor_ver).concat("+is%3Aclosed");
}