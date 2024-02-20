function originalPositionFor({
    columnNumber,
    lineNumber
  }) {
    // Error.prototype.stack columns are 1-based (like most IDEs) but ASTs are 0-based.
    const targetColumnNumber = columnNumber - 1;
    let section = null;
    let startIndex = 0;
    let stopIndex = sections.length - 1;
    let index = -1;

    while (startIndex <= stopIndex) {
      index = Math.floor((stopIndex + startIndex) / 2);
      section = sections[index];
      const currentLine = section.generatedLine;

      if (currentLine === lineNumber) {
        const currentColumn = section.generatedColumn;

        if (currentColumn === lineNumber) {
          break;
        } else {
          if (currentColumn > targetColumnNumber) {
            if (stopIndex - index > 0) {
              stopIndex = index;
            } else {
              index = stopIndex;
              break;
            }
          } else {
            if (index - startIndex > 0) {
              startIndex = index;
            } else {
              index = startIndex;
              break;
            }
          }
        }
      } else {
        if (currentLine > lineNumber) {
          if (stopIndex - index > 0) {
            stopIndex = index;
          } else {
            index = stopIndex;
            break;
          }
        } else {
          if (index - startIndex > 0) {
            startIndex = index;
          } else {
            index = startIndex;
            break;
          }
        }
      }
    }

    if (section == null) {
      // TODO maybe fall back to the runtime source instead of throwing?
      throw Error(`Could not find matching section for line:${lineNumber} and column:${columnNumber}`);
    }

    if (section.sourceMapConsumer === null) {
      // Lazily parse the section only when it's needed.
      // $FlowFixMe[invalid-constructor] Flow no longer supports calling new on functions
      section.sourceMapConsumer = new SourceMapConsumer(section.map);
    }

    return section.sourceMapConsumer.originalPositionFor({
      columnNumber,
      lineNumber
    });
  }