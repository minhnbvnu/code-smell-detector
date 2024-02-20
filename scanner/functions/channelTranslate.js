function channelTranslate(src) {
      // skip source in manifest
      if (src !== 'source') {
        if (regUUID.test(src)) {
          src = _.find(channels, { id : src }).action;
          manifest[src] = true;
        } else if (!regUUID.test(src)) {
          manifest[src] = true;
        }
      }

      return src;
    }