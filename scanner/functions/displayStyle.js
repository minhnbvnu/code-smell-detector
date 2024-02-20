function displayStyle(style) {
  return style === '"' ? '`"`' : style === "'" ? "`'`" : "`'('` and `')'`"
}