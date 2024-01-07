function verifyForcedBinary(binary) {
    if (typeof binary !== 'undefined' && binary.length > 0) {
      verifyBinary(binary);
      if (!usablePythonWasFound) {
        throw new Error(
          `NODE_GYP_FORCE_PYTHON is set to: "${binary}", but this is not a valid Python.\n` +
            'Please set NODE_GYP_FORCE_PYTHON to something valid, or unset it entirely.\n' +
            '(Python 2.6, 2.7 or 3.5+ is required to build Atom.)\n'
        );
      }
    }
  }