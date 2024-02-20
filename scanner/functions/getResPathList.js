function getResPathList (includeRes) {
        var arr = [];
        includeRes.forEach(function (item) {
          var itemStr = item.name;
          if (itemStr) {
            itemStr = path.join(appPath, item.module, 'dist', 'output', 's', itemStr);
            arr.push(itemStr);
          }
        });
        return arr;
      }