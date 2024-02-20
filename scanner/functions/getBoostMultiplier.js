function getBoostMultiplier(boost) {
        var DEFAULT_MULTIPLIER = .05;
        var MIN_MULTIPLIER = .001;
        var MAX_MULTIPLIER = 50;
        var parsedBoost = parseFloat(boost);
        var boostMultiplier = nativeIsNaN(parsedBoost) || !nativeIsFinite(parsedBoost) ? DEFAULT_MULTIPLIER : parsedBoost;
        if (boostMultiplier < MIN_MULTIPLIER) {
          boostMultiplier = MIN_MULTIPLIER;
        }
        if (boostMultiplier > MAX_MULTIPLIER) {
          boostMultiplier = MAX_MULTIPLIER;
        }
        return boostMultiplier;
      }