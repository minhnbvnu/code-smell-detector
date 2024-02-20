function cleanPatches(rawPatches){
      var patches;

      patches = removeLengthRelatedPatches(rawPatches);
      patches = removeMultipleAddOrRemoveColPatches(patches);

      return patches;
    }