function impl (data, fn) {
      let requestPath = action.href
      const pathParams = action.href.match(/{[^}]+}/g) || []

      if (typeof data === 'function') {
        fn = data
        data = undefined
      }

      let err

      if (this.params.length !== pathParams.length) {
        err = new Error(`Invalid number of params in path (expected ${pathParams.length}, got ${this.params.length}).`)

        return fn(err)
      }

      this.params.forEach((param) => {
        requestPath = requestPath.replace(/{[^}]+}/, param)
      })

      // check required payload properties
      if (requiredProps && requiredProps.length > 0) {
        if (!data) {
          err = new Error('Missing parameters.')
        } else {
          for (let i = 0; i < requiredProps.length; i++) {
            const prop = requiredProps[i]

            if (typeof data[prop] === 'undefined') {
              err = new Error(`Missing parameter '${prop}'`)
              break
            }
          }
        }
      }

      if (err) {
        return fn(err)
      }

      // check payload property types
      for (const key in properties) {
        if (data && data[key]) {
          const type = properties[key].type

          let dataType = typeof data[key]

          if (Array.isArray(data[key])) {
            dataType = 'array'
          }

          if (Array.isArray(type)) {
            if (type.indexOf(dataType) === -1) {
              err = new Error(`Invalid parameter type. ${key} must be of type: ${type}.`)
              break
            }
          } else if (dataType !== type) {
            err = new Error(`Invalid parameter type. ${key} must be of type: ${type}.`)
            break
          }
        }
      }

      if (err) {
        return fn(err)
      }

      this.client = this.base

      return this.client.request(action.method, requestPath, data, fn)
    }