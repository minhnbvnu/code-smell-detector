function removeContainer (all) {
    var changes = Array.isArray(all) ? all : [all];
    drake.containers = drake.containers.filter(keepable);
    console.warn && console.warn('drake.removeContainer is deprecated. please access drake.containers directly, instead');
    function keepable (container) {
      return changes.indexOf(container) === -1;
    }
  }