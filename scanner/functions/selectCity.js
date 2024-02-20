function selectCity (item) {
      if (isSelected(item, selected.value)) {
        selected.value.splice(selected.value.findIndex(val => val.key === item.key), 1)
      } else {
        selected.value.push(item)
      }
      emitData()
      nextTick(() => {
        adjustDropdown()
      })
    }