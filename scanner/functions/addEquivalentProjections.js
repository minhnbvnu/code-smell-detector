function addEquivalentProjections(projections) {
  addProjections(projections);
  projections.forEach(function (source) {
    projections.forEach(function (destination) {
      if (source !== destination) {
        addTransformFunc(source, destination, cloneTransform);
      }
    });
  });
}