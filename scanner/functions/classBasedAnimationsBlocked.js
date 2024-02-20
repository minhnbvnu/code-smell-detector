function classBasedAnimationsBlocked(element, setter) {
        var data = element.data(NG_ANIMATE_STATE) || {};
        if (setter) {
          data.running = true;
          data.structural = true;
          element.data(NG_ANIMATE_STATE, data);
        }
        return data.disabled || (data.running && data.structural);
      }