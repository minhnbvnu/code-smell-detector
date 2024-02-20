function parentsToSlug(child) {
  var labels = [];
  var parent = child.parent;
  while(parent) {
    labels.push(parent.label);
    parent = parent.parent;
  }
  labels = _.without(labels.reverse(), 'root');
  return _.map(labels, function(l) { return slug(l.toLowerCase()) }).join('/');
}