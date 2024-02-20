function supportedModes(capability) {
      return modes.reduce((accum, mode) => {
        if (capability & (1 << mode)) {
          accum.push(mode);
        }
        return accum;
      }, []);
    }