function unpackShape(name, type) {
      if(type[1] === "native") {
        return [
          name, "d0=", name, ".length,",
          name, "d1=", name, "[0].length,"
        ].join("")
      } else {
        return [
          name, "d0=", name, ".shape[0],",
          name, "d1=", name, ".shape[1],",
          name, "s0=", name, ".stride[0],",
          name, "s1=", name, ".stride[1],",
          name, "o=", name, ".offset,",
          name, "d=", name, ".data,"
        ].join("")
      }
    }