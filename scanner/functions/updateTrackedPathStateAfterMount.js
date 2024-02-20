function updateTrackedPathStateAfterMount(mightSiblingsBeOnTrackedPath) {
    // updateTrackedPathStateBeforeMount() told us whether to match siblings.
    // Now that we're entering siblings, let's use that information.
    mightBeOnTrackedPath = mightSiblingsBeOnTrackedPath;
  }