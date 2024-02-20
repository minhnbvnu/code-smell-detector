function assertIsMounted(fiber) {
    if (getNearestMountedFiber(fiber) !== fiber) {
      throw new Error('Unable to find node on an unmounted component.');
    }
  }