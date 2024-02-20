function generateColumn (list, haveChild, value, callback) {
      return h(RegionColumn, {
        list,
        haveChild,
        modelValue: value,
        'onUpdate:modelValue': val => {
          callback(val)
          emit('adjust')
          if (isComplete.value) {
            emit('complete')
          }
        }
      })
    }