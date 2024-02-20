function ColorCache (max) {
      if (max === void 0) {
        max = 10;
      }
      var storageString = global$9.getItem(storageName);
      var localstorage = isString(storageString) ? JSON.parse(storageString) : [];
      var prune = function (list) {
        var diff = max - list.length;
        return diff < 0 ? list.slice(0, max) : list;
      };
      var cache = prune(localstorage);
      var add = function (key) {
        indexOf(cache, key).each(remove);
        cache.unshift(key);
        if (cache.length > max) {
          cache.pop();
        }
        global$9.setItem(storageName, JSON.stringify(cache));
      };
      var remove = function (idx) {
        cache.splice(idx, 1);
      };
      var state = function () {
        return cache.slice(0);
      };
      return {
        add: add,
        state: state
      };
    }