function laneToLanesArray(lanes) {
    const lanesArray = [];
    let lane = 1;

    for (let index = 0; index < src_constants["a" /* REACT_TOTAL_NUM_LANES */]; index++) {
      if (lane & lanes) {
        lanesArray.push(lane);
      }

      lane *= 2;
    }

    return lanesArray;
  }