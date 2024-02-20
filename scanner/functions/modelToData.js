function modelToData () {
    if (!props.modelValue || !Object.keys(props.modelValue).length) {
      return
    }
    modelToRegion(props.modelValue, availableLevels(props)).then(resp => {
      setData(resp)
      emitChange(getData())
    })
  }