function removeLengthRelatedPatches(rawPatches){
      return rawPatches.filter(function(patch){
        return !/[/]length/ig.test(patch.path);
      })
    }