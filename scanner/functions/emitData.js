function emitData (updateModelValue = true) {
      if (updateModelValue) {
        emit('update:modelValue', selected.value.map(val => val.key))
      }
      emit('change', selected.value)
    }