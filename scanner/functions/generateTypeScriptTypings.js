function generateTypeScriptTypings(fns, aliases, locales) {
  const nonFPFns = fns.filter((fn) => !fn.isFPFn)
  const fpFns = fns.filter((fn) => fn.isFPFn)

  const moduleDefinitions = [getTypeScriptDateFnsModuleDefinition('', nonFPFns)]
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '', '', false)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '', '/index', false)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '', '/index.js', false)))
    .map((module) => module.definition)

  const fpModuleDefinitions = [getTypeScriptDateFnsFPModuleDefinition('', fpFns)]
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '', '', false)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '', '/index', false)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '', '/index.js', false)))
    .map((module) => module.definition)

  const esmModuleDefinitions = [getTypeScriptDateFnsModuleDefinition('/esm', nonFPFns)]
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '/esm', '', true)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '/esm', '/index', true)))
    .concat(nonFPFns.map(getTypeScriptFnModuleDefinition.bind(null, '/esm', '/index.js', true)))
    .map((module) => module.definition)

  const esmFPModuleDefinitions = [getTypeScriptDateFnsFPModuleDefinition('/esm', fpFns)]
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '/esm', '', true)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '/esm', '/index', true)))
    .concat(fpFns.map(getTypeScriptFPFnModuleDefinition.bind(null, '/esm', '/index.js', true)))
    .map((module) => module.definition)

  const aliasDefinitions = aliases.map(getTypeScriptTypeAlias)

  // const exportedAliasDefinitions = [getExportedTypeScriptTypeAliases(aliases)]

  // const localeModuleDefinitions = [getTypeScriptLocaleIndexModuleDefinition('', locales)]
  //   .concat(locales.map(getTypeScriptLocaleModuleDefinition.bind(null, '', '', false)))
  //   .concat(locales.map(getTypeScriptLocaleModuleDefinition.bind(null, '', '/index', false)))
  //   .concat(locales.map(getTypeScriptLocaleModuleDefinition.bind(null, '', '/index.js', false)))
  //   .map((module) => module.definition)

  // const esmLocaleModuleDefinitions = [getTypeScriptLocaleIndexModuleDefinition('/esm', locales)]
  //   .concat(locales.map(getTypeScriptLocaleModuleDefinition.bind(null, '/esm', '', true)))
  //   .concat(locales.map(getTypeScriptLocaleModuleDefinition.bind(null, '/esm', '/index', true)))
  //   .concat(locales.map(getTypeScriptLocaleModuleDefinition.bind(null, '/esm', '/index.js', true)))
  //   .map((module) => module.definition)

  // const globalInterfaceDefinition = formatBlock`
  //   interface dateFns {
  //     ${addSeparator(nonFPFns.map(getTypeScriptInterfaceDefinition), '\n')}
  //   }
  // `

  const typingFile = formatTypeScriptFile`
    // FP Interfaces

    ${addSeparator(getTypeScriptFPInterfaces(), '\n')}

    declare module 'date-fns-tz' {
      import { Locale } from "date-fns"

      ${addSeparator(aliasDefinitions, '\n')}
    }

    // Regular Functions

    ${addSeparator(moduleDefinitions, '\n')}

    // FP Functions

    ${addSeparator(fpModuleDefinitions, '\n')}

    // ECMAScript Module Functions

    ${addSeparator(esmModuleDefinitions, '\n')}

    // ECMAScript Module FP Functions

    ${addSeparator(esmFPModuleDefinitions, '\n')}
  `

  writeFile('typings.d.ts', typingFile)

  fns.forEach((fn) => {
    if (fn.isFPFn) {
      generateTypescriptFPFnTyping(fn)
    } else {
      generateTypescriptFnTyping(fn)
    }
  })

  locales.forEach((locale) => {
    generateTypescriptLocaleTyping(locale)
  })
}