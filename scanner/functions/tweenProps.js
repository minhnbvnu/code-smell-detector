function tweenProps (forPosition, currentState, originalState, targetState,
      duration, timestamp, easing) {
      var normalizedPosition = (forPosition - timestamp) / duration;

      var prop;
      for (prop in currentState) {
        if (currentState.hasOwnProperty(prop)) {
          currentState[prop] = tweenProp(originalState[prop],
            targetState[prop], formula[easing[prop]], normalizedPosition);
        }
      }

      return currentState;
    }