constructor(center, radius, layout) {
    super();
    if (layout !== undefined && radius === undefined) {
      this.setFlatCoordinates(layout, center);
    } else {
      radius = radius ? radius : 0;
      this.setCenterAndRadius(center, radius, layout);
    }
  }