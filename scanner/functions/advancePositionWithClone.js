function advancePositionWithClone(pos, source, numberOfCharacters = source.length) {
    return advancePositionWithMutation(
      extend({}, pos),
      source,
      numberOfCharacters
    );
  }