function replaceLaTeXChars(string) {
  // TODO: need more replacements
  return string
    .replace(/\\'e/g, 'é')
    .replace(/\\'\{e\}/g, 'é')
    .replace(/\{/g, '')
    .replace(/\}/g, '')
    .replace(/--/g, '—')
    .replace(/\s+/g, ' ')
  ;
}