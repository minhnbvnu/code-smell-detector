function d3_interpolateByName(name) {
    return name == "transform" ? d3.interpolateTransform : d3.interpolate;
  }