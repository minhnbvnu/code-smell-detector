function generateTypescriptLocaleTyping(locale) {
  const typingFile = formatTypeScriptFile`
    import {${locale.name}} from 'date-fns-tz/locale'
    export = ${locale.name}
  `
  writeFile(`src/locale/${locale.code}/index.d.ts`, typingFile)
}