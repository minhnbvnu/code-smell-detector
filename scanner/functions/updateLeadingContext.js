function updateLeadingContext(message, pendingLeadingContext, options) {
  if (message.type !== 'match' && message.type !== 'context') {
    return;
  }

  if (options.leadingContextLineCount) {
    pendingLeadingContext.push(cleanResultLine(message.data.lines));

    if (pendingLeadingContext.length > options.leadingContextLineCount) {
      pendingLeadingContext.shift();
    }
  }
}