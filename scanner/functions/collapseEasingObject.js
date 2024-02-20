function collapseEasingObject (easingObject, tokenData) {
      Tweenable.each(tokenData, function (prop) {
        var currentProp = tokenData[prop];
        var chunkNames = currentProp.chunkNames;
        var chunkLength = chunkNames.length;
        var composedEasingString = '';

        for (var i = 0; i < chunkLength; i++) {
          composedEasingString += ' ' + easingObject[chunkNames[i]];
          delete easingObject[chunkNames[i]];
        }

        easingObject[prop] = composedEasingString.substr(1);
      });
    }