function enterVRFailure (err) {
      self.removeState('vr-mode');
      if (err && err.message) {
        throw new Error('Failed to enter VR mode (`requestPresent`): ' + err.message);
      } else {
        throw new Error('Failed to enter VR mode (`requestPresent`).');
      }
    }