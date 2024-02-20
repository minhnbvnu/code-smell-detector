function generateTypescriptFPFnTyping(fn) {
  const typingFile = formatTypeScriptFile`
    import {${fn.title}} from 'date-fns-tz/fp'
    export = ${fn.title}
  `
  writeFile(`./src/fp/${fn.title}/index.d.ts`, typingFile)
}