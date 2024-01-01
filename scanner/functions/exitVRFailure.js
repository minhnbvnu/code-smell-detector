function exitVRFailure (err) {
      if (err && err.message) {
        throw new Error('Failed to exit VR mode (`exitPresent`): ' + err.message);
      } else {
        throw new Error('Failed to exit VR mode (`exitPresent`).');
      }
    }