function getFormattedOutput(fmt) {
  const item = formatColor(fmt.color, fmt.name, fmt.formatter);
  const suffix = getSuffix(fmt.hint, fmt.formatter);
  return `${fmt.prefix}─ ${item}${suffix}\n`;
}