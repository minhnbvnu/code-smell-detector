function getTopLevelComponents(owner) {
    try {
      let map = new Map();
      collectComponentsByController(map, null, getRootViews(owner));
      return map;
    } catch (error) {
      console.log('[Ember Inspector] failed to capture render tree');
      console.log(error);
      return undefined;
    }
  }