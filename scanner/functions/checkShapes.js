function checkShapes(out, a, b) {
      var os = shape(out)
      var as = shape(a)
      var bs = shape(b)
      if(os[0] !== as[0] || os[1] !== bs[1] || as[1] !== bs[0]) {
        throw new Error("Mismatched array shapes for matrix product")
      }
    }