function generateMatrixProduct(outType, aType, bType, useAlpha, useBeta) {
      var funcName = ["gemm", outType[0], outType[1],
                         "a", aType[0], aType[1],
                         "b", bType[0], bType[1],
                         useAlpha ? "alpha" : "",
                         useBeta ? "beta" : "" ].join("")
      var code = [
        "function ", funcName, "(o,a,b,A,B){",
        "var ", unpackShape("o", outType),
                unpackShape("a", aType),
                unpackShape("b", bType),
                "i,j,k;"
      ]

      if(aType[0] === "r" && bType[0] === "c") {
        code.push.apply(code, generateRowColumnLoop(outType, aType, bType, useAlpha, useBeta))
      } else {
        code.push.apply(code, generateBlockLoop(outType, aType, bType, useAlpha, useBeta))
      }

      code.push("}return ", funcName)

      //Compile function
      var proc = new Function(code.join(""))
      return proc()
    }