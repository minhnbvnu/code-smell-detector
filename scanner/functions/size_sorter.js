function size_sorter(ascending) {
        var order = ascending ? 1 : 0;
        // directories have file size of undefined
        return (function(a, b) {
          if (a.size === undefined) {
             return (ascending) ? -1 : 1;
          }

          if (b.size === undefined) {
             return (ascending) ? 1 : -1;
          }

          if (a.size > b.size) {
            return (ascending) ? -1 : 1;
          }

          if (b.size > a.size) {
            return (ascending) ? 1 : -1;
          }

          return 0;
        });
    }