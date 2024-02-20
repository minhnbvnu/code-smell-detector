function runHookForOperation(rawPatches){
    var instance = this;
    var patches = cleanPatches(rawPatches);

    for(var i = 0, len = patches.length; i < len; i++){
      var patch = patches[i];
      var parsedPath = parsePath(patch.path);


      switch(patch.op){
        case 'add':
          if(isNaN(parsedPath.col)){
            instance.runHooks('afterCreateRow', parsedPath.row);
          } else {
            instance.runHooks('afterCreateCol', parsedPath.col);
          }
          break;

        case 'remove':
          if(isNaN(parsedPath.col)){
            instance.runHooks('afterRemoveRow', parsedPath.row, 1);
          } else {
            instance.runHooks('afterRemoveCol', parsedPath.col, 1);
          }
          break;

        case 'replace':
          instance.runHooks('afterChange', [parsedPath.row, parsedPath.col, null, patch.value], 'external');
          break;
      }
    }

    function cleanPatches(rawPatches){
      var patches;

      patches = removeLengthRelatedPatches(rawPatches);
      patches = removeMultipleAddOrRemoveColPatches(patches);

      return patches;
    }

    /**
     * Removing or adding column will produce one patch for each table row.
     * This function leaves only one patch for each column add/remove operation
     */
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

    /**
     * If observeChanges uses native Object.observe method, then it produces patches for length property.
     * This function removes them.
     */
    function removeLengthRelatedPatches(rawPatches){
      return rawPatches.filter(function(patch){
        return !/[/]length/ig.test(patch.path);
      })
    }

    function parsePath(path){
      var match = path.match(/^\/(\d+)\/?(.*)?$/);
      return {
        row: parseInt(match[1], 10),
        col: /^\d*$/.test(match[2]) ? parseInt(match[2], 10) : match[2]
      }
    }
  }