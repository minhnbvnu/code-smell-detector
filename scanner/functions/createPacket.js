function createPacket(resolution, precinctNumber, layerNumber) {
    var precinctCodeblocks = [];
    var subbands = resolution.subbands;

    for (var i = 0, ii = subbands.length; i < ii; i++) {
      var subband = subbands[i];
      var codeblocks = subband.codeblocks;

      for (var j = 0, jj = codeblocks.length; j < jj; j++) {
        var codeblock = codeblocks[j];

        if (codeblock.precinctNumber !== precinctNumber) {
          continue;
        }

        precinctCodeblocks.push(codeblock);
      }
    }

    return {
      layerNumber,
      codeblocks: precinctCodeblocks
    };
  }