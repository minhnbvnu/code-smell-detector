function getRefine(refine) {
    switch (refine) {
      case "REPLACE":
      case "replace":
        return TILE_REFINEMENT.REPLACE;
      case "ADD":
      case "add":
        return TILE_REFINEMENT.ADD;
      default:
        return refine;
    }
  }