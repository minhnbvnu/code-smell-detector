function handleField (name, value, options) {
      var serialized
      var length
      var key
      var i

      options = options || { attachment: false }

      if (is(name).a(Object)) {
        for (key in name) {
          if (Object.prototype.hasOwnProperty.call(name, key)) {
            handleField(key, name[key], options)
          }
        }
      } else {
        if (is(value).a(Array)) {
          for (i = 0, length = value.length; i < length; i++) {
            serialized = handleFieldValue(value[i])
            if (serialized) {
              $this.rawField(name, serialized, options)
            }
          }
        } else if (value != null) {
          $this.rawField(name, handleFieldValue(value), options)
        }
      }

      return $this
    }