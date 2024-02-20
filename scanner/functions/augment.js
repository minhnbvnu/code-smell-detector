function augment(data) {
      // Augment partitioning layout with "dummy" nodes so that internal nodes'
      // values dictate their width. Annoying, but seems to be least painful
      // option.  https://github.com/mbostock/d3/pull/574
      if (data.children && (data.children.length > 0)) {
        data.children.forEach(augment);
        var childValues = 0;
        data.children.forEach(function(child) {
          childValues += child.value;
        });
        if (childValues < data.value) {
          data.children.push(
            {
              "name": "",
              "value": data.value - childValues,
              "dummy": true
            }
          );
        }
      }
    }