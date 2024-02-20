function isStringOrRegExp(potential) {
      return potential instanceof RegExp || (typeof potential == 'string');
    }