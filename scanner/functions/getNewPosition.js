function getNewPosition(context, start, numberOfCharacters) {
    return advancePositionWithClone(
      start,
      context.originalSource.slice(start.offset, numberOfCharacters),
      numberOfCharacters
    );
  }