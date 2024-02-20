function genDefaultSchemaTable (array, type) {
  if (type === 'source') {
    let arrayFinal = array.map(i => {
      const temp = Object.assign(i, {
        selected: true,
        rename: i.fieldName.split('#').pop(),
        ums_id_: false,
        ums_ts_: false,
        ums_op_: '',
        forbidden: false
      })
      return temp
    })
    return arrayFinal
  } else {
    let arrayFinal = array.map(i => {
      const temp = Object.assign(i, {
        selected: true,
        forbidden: false
      })
      return temp
    })
    return arrayFinal
  }
}