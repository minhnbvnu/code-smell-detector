function updateWithTouchData(e) {
      var keys, i;
      if (e.changedTouches) {
        keys = 'screenX screenY pageX pageY clientX clientY'.split(' ');
        for (i = 0; i < keys.length; i++) {
          e[keys[i]] = e.changedTouches[0][keys[i]];
        }
      }
    }