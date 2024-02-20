function removeMultipleAddOrRemoveColPatches(rawPatches){
      var newOrRemovedColumns = [];

      return rawPatches.filter(function(patch){
        var parsedPath = parsePath(patch.path);

        if(['add', 'remove'].indexOf(patch.op) != -1 && !isNaN(parsedPath.col)){
          if(newOrRemovedColumns.indexOf(parsedPath.col) != -1){
            return false;
          } else {
            newOrRemovedColumns.push(parsedPath.col);
          }
        }

        return true;
      });

    }