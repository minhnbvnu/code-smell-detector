function repeatLines(line, count) {
    return _.times(count)
      .map(() => line)
      .join('\n')
  }