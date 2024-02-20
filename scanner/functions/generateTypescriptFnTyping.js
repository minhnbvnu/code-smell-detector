function generateTypescriptFnTyping(fn) {
  const typingFile = formatTypeScriptFile`
    import {${fn.title}} from 'date-fns-tz'
    export = ${fn.title}
  `
  writeFile(`./src/${fn.title}/index.d.ts`, typingFile)
}