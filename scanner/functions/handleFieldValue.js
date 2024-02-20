function handleFieldValue (value) {
      if (!(value instanceof Buffer || typeof value === 'string')) {
        if (is(value).a(Object)) {
          if (value instanceof fs.FileReadStream) {
            return value
          } else {
            return Unirest.serializers.json(value)
          }
        } else {
          return value.toString()
        }
      } else return value
    }