function classifyType(m) {
      if(Array.isArray(m)) {
        if(Array.isArray(m)) {
          return [ "r", "native" ]
        }
      } else if(m.shape && (m.shape.length === 2)) {
        if(m.order[0]) {
          return [ "r", m.dtype ]
        } else {
          return [ "c", m.dtype ]
        }
      }
      throw new Error("Unrecognized data type")
    }