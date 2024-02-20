function decodeMissionFlags (flags) {
    return {
      idle: !(flags & 4),
      binFull: Boolean(flags & 1),
      binRemoved: Boolean(flags & 2),
      beeping: Boolean(flags & 8)
    };
  }