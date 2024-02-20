function buildData(conf, dataList) {
  if (conf.fieldName === undefined) return
  let defaultValue
  if (typeof (conf.defaultValue) === 'string' && !conf.multiple) {
    defaultValue = `'${conf.defaultValue}'`
  } else {
    defaultValue = `${JSON.stringify(conf.defaultValue)}`
  }
  dataList.push(`${conf.fieldName}: ${defaultValue},`)
}