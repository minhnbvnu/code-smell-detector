function _addToWhitelist(item) {
      if (list.indexOf(item) === -1) {
        list.push(item);

        if (componentDependencies[item] && componentDependencies[item].dependencies) {
          componentDependencies[item].dependencies.forEach(_addToWhitelist);
        }
      }
    }