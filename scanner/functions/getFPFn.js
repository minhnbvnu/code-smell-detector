function getFPFn(resultFnName, initialFnName, arity) {
  return [generatedAutomaticallyMessage]
    .concat('')
    .concat(`import fn from '../../${initialFnName}/index.js'`)
    .concat(`import convertToFP from 'date-fns/fp/_lib/convertToFP/index.js'`)
    .concat('')
    .concat(`var ${resultFnName} = convertToFP(fn, ${arity})`)
    .concat('')
    .concat(`export default ${resultFnName}`)
    .concat('')
    .join('\n')
}