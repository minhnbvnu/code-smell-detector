function parseArtifactBrief(arr) {
    if (arr === null) return null;

    // array index 0 is for fragments at the portal. index 1 is for target portals
    // each of those is two dimensional - not sure why. part of this is to allow for multiple types of artifacts,
    // with their own targets, active at once - but one level for the array is enough for that

    // making a guess - first level is for different artifact types, second index would allow for
    // extra data for that artifact type

    function decodeArtifactArray(arr) {
      var result = {};
      for (var i=0; i<arr.length; i++) {
        // we'll use the type as the key - and store any additional array values as the value
        // that will be an empty array for now, so only object keys are useful data
        result[arr[i][0]] = arr[i].slice(1);
      }
      return result;
    }

    return {
      fragment: decodeArtifactArray(arr[0]),
      target: decodeArtifactArray(arr[1]),
    };
  }