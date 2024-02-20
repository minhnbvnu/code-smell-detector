function buildFormTemplate(conf, child) {
  let labelPosition = ''
  if (conf.labelPosition !== 'right') {
    labelPosition = `label-position="${conf.labelPosition}"`
  }
  const disabled = conf.disabled ? `:disabled="${conf.disabled}"` : ''
  let str = `<el-form ref="form" :model="form" :rules="rules" size="${conf.size}" ${disabled} label-width="${conf.labelWidth}px" ${labelPosition}>
      ${child}
    </el-form>`
  if (someSpanIsNot24) {
    str = `<el-row :gutter="${conf.gutter}">
        ${str}
      </el-row>`
  }
  return str
}