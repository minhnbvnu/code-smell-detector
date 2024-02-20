function addContainer (all) {
    var changes = Array.isArray(all) ? all : [all];
    drake.containers = drake.containers.concat(changes);
    console.warn && console.warn('drake.addContainer is deprecated. please access drake.containers directly, instead');
  }