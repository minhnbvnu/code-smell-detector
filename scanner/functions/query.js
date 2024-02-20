function query (value) {
      if (value) {
        const result = []
        fullCityDirectory.forEach(val => {
          const cities = val.cities.filter(city => new RegExp(value).test(city.value))
          if (cities.length) {
            result.push({ province: val.province, cities })
          }
        })
        list.value = result
      } else {
        list.value = fullCityDirectory
      }
      nextTick(() => {
        emit('adjust-dropdown')
      })
    }