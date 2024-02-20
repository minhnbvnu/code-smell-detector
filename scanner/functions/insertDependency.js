function insertDependency(depList) {
        fnArray.push('dependency');
        argsArray.push(depList);
        for (var i = 0, ii = depList.length; i < ii; i++) {
          var dep = depList[i];
          if (dependency.indexOf(dep) == -1) {
            dependency.push(depList[i]);
          }
        }
      }