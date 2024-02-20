function selfLoathingQuantification() {
      const notNull = function (x) {
        return x !== null;
      };

      const positiveSamples = [];
      const negativeSamples = [];

      positiveSamples.push(
        getAveragePositiveEmotions(viewerFaceData, 585, 1025)
      ); // dog AR filter bit
      negativeSamples.push(
        getAverageNegativeEmotions(viewerFaceData, 585, 1025)
      );

      positiveSamples.push(
        getAveragePositiveEmotions(viewerFaceData, 2125, 2278)
      ); // AI vision bit
      negativeSamples.push(
        getAverageNegativeEmotions(viewerFaceData, 2125, 2278)
      );

      positiveSamples.push(
        getAveragePositiveEmotions(viewerFaceData, 3363, 3921)
      ); // tophat/monocle AR filter + enumerated landmarks bit
      negativeSamples.push(
        getAverageNegativeEmotions(viewerFaceData, 3363, 3921)
      );

      positiveSamples.push(
        getAveragePositiveEmotions(viewerFaceData, 6731, 7222)
      ); // Geolocation correlation bit
      negativeSamples.push(
        getAverageNegativeEmotions(viewerFaceData, 6731, 7222)
      );

      if (positiveSamples.some(notNull) && negativeSamples.some(notNull)) {
        let positiveAcc = 0;
        for (let i = 0; i < positiveSamples.length; i += 1) {
          positiveAcc += positiveSamples[i];
        }

        let negativeAcc = 0;
        for (let i = 0; i < negativeSamples.length; i += 1) {
          negativeAcc += negativeSamples[i];
        }

        const meanPositive = positiveAcc / positiveSamples.length;
        const meanNegative = negativeAcc / negativeSamples.length;

        if (meanNegative > meanPositive) {
          isSelfLoathing = true;
        }

        // We only emit a visualization event if we got some signal from the user
        if (K_INSTALLATION_MODE) {
          socket.emit("selfImage", [
            isSelfLoathing,
            Math.abs(meanPositive - meanNegative).toFixed(6),
          ]);
        }

        selfImageQuantificationComplete = true;
        finalPopSFX.play();

        // console.log(`Self loathing delta: ${meanPositive - meanNegative}`)
      }

      if (isSelfLoathing) {
        isSelfLoathingSFX.play();
      } else {
        isNotSelfLoathingSFX.play();
      }

      reactionToYourselfLabel.text =
        "reaction to yourself: " + (isSelfLoathing ? "bad" : "good");
      reactionToYourselfLabel.position.x =
        userVideoGroup.x + userVideoSprite.x + userVideoSprite.width - 37;
      reactionToYourselfLabel.position.y = K_PROJECT_HEIGHT - 147;
      reactionToYourselfLabel.visible = true;
    }