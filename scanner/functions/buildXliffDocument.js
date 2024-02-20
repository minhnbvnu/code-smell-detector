function buildXliffDocument (lang, units) {
/*eslint-disable max-len*/
  return `
<xliff xmlns="urn:oasis:names:tc:xliff:document:2.0" version="2.0" srcLang="en" trgLang="${lang}">
  <file id="f1">
    ${units.join('')}
 </file>
</xliff>
  `
/*eslint-enable max-len*/
}