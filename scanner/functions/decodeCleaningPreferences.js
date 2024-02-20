function decodeCleaningPreferences (flags) {
    let carpetBoostOptions = {
      '0': 'auto',
      '16': 'eco',
      '80': 'performance'
    };
    let cleaningPasses = {
      '0': 'auto',
      '1024': '1',
      '1025': '2'
    };
    return {
      carpetBoost: carpetBoostOptions[(flags & 80)],
      edgeClean: !(flags & 2),
      cleaningPasses: cleaningPasses[(flags & 1025)],
      alwaysFinish: !(flags & 32)
    };
  }