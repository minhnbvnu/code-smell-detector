function d3_geo_projection(project) {
    return d3_geo_projectionMutator(function() {
      return project;
    })();
  }