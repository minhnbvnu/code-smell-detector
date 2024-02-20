function outputMessage(messageOrError, severity) {
      severity = severity || 'info';
      let message;
      if (Object.prototype.toString.call(messageOrError) === '[object Error]') {
        if (severity === 'error') {
          message = messageOrError.stack;
        } else {
          message =
            messageOrError.message ||
            messageOrError.name ||
            messageOrError.code;
        }
        if (messageOrError.asset) {
          const fileLineCol = [messageOrError.asset.urlOrDescription];
          if (messageOrError.line) {
            fileLineCol.push(messageOrError.line);

            if (messageOrError.column) {
              fileLineCol.push(messageOrError.col);
            }
          }
          message = `${fileLineCol.join(':')} - ${message}`;
          const incomingRelations = messageOrError.asset.incomingRelations;
          if (incomingRelations.length > 0) {
            message += `\nIncluding assets:\n    ${incomingRelations
              .map((incomingRelation) => {
                return incomingRelation.from.urlOrDescription;
              })
              .join('\n    ')}\n`;
          }
        }
      } else {
        if (typeof messageOrError === 'string') {
          message = messageOrError;
        } else if (typeof messageOrError.message === 'string') {
          message = messageOrError.message;
        } else {
          // Give up guessing. This is probably an error on the next lines...
          message = messageOrError;
        }
      }
      const caption = ` ${
        symbolBySeverity[severity]
      } ${severity.toUpperCase()}: `;

      message = message
        .replace(cwdRegExp, '')
        .replace(
          assetGraphRootRelativeToCwdRegExp,
          chalk.gray(`${assetGraphRootRelativeToCwd}/`)
        );

      console[severity](
        chalk[colorBySeverity[severity]](caption) +
          indentSubsequentLines(message, caption.length)
      );
    }