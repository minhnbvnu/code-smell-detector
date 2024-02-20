function getSketchName() {
    var loc = window.location.pathname;
    var dir = loc.split('/');
    return dir[dir.length-2];
  }