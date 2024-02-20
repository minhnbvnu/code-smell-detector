function toggleVisibility(state) {
        var selectors = global$e.map(handles, function (handle) {
          return '#' + id + '-' + handle.name;
        }).concat(global$e.map(blockers, function (blocker) {
          return '#' + id + '-' + blocker;
        })).join(',');
        if (state) {
          global$b(selectors, containerElm).show();
        } else {
          global$b(selectors, containerElm).hide();
        }
      }