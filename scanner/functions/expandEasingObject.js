function expandEasingObject (easingObject, tokenData) {
      Tweenable.each(tokenData, function (prop) {
        var currentProp = tokenData[prop];
        var chunkNames = currentProp.chunkNames;
        var chunkLength = chunkNames.length;
        var easingChunks = easingObject[prop].split(' ');
        var lastEasingChunk = easingChunks[easingChunks.length - 1];

        for (var i = 0; i < chunkLength; i++) {
          easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
        }

        delete easingObject[prop];
      });
    }