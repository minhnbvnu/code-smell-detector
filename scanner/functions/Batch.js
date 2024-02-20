function Batch() {
    var batch = {};
    var size = 0;
    var topLevel = 0;
    var bottomLevel = 0;

    function add(level, fn) {
      if (!fn) {
        fn = level;
        level = 0;
      }

      if (level > topLevel) {
        topLevel = level;
      } else if (level < bottomLevel) {
        bottomLevel = level;
      }

      if (!batch[level]) {
        batch[level] = [];
      }

      batch[level].push(fn);
      size++;
    }

    function process() {
      for (var level = bottomLevel; level <= topLevel; level++) {
        var fns = batch[level];

        for (var i = 0; i < fns.length; i++) {
          var fn = fns[i];
          fn();
        }
      }
    }

    function getSize() {
      return size;
    }

    return {
      add: add,
      process: process,
      size: getSize,
    };
  }