function updateTrailingContexts(message, pendingTrailingContexts, options) {
  if (message.type !== 'match' && message.type !== 'context') {
    return;
  }

  if (options.trailingContextLineCount) {
    for (const trailingContextLines of pendingTrailingContexts) {
      trailingContextLines.push(cleanResultLine(message.data.lines));

      if (trailingContextLines.length === options.trailingContextLineCount) {
        pendingTrailingContexts.delete(trailingContextLines);
      }
    }
  }
}