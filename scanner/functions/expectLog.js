function expectLog({
  description,
  symbol,
  title,
  type,
  verboseModeEnabled,
  verboseOnly,
}) {
  const symbolColored = colorize(symbol)[colors[(type || 'info')]];
  const descriptionColored = description
    ? colorize(description).dim
    : undefined;

  if (verboseModeEnabled) {
    enableVerbose();
  }

  console.log = jest.fn();
  log(title, { type, description, verboseOnly });

  if (type === 'info' && !verboseModeEnabled && verboseOnly) {
    expect(console.log.mock.calls[0]).toBeUndefined();
  } else {
    expect(console.log.mock.calls[0][0]).toBe(symbolColored);
    expect(console.log.mock.calls[0][1]).toBe(title);
    expect(console.log.mock.calls[0][4]).toBe(descriptionColored);
  }

  console.log.mockRestore();
}