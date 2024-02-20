function asyncForEach(list, iterator, done) {
  var i = 0;
  function loop(error, index) {
    if (index && index > i) {
      i = index;
    }
    if (error || i >= list.length) {
      done(error);
    } else {
      try {
        iterator(list[i++], loop);
      } catch (e) {
        done(e);
      }
    }
  }
  loop();
}