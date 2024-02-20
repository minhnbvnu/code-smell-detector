function generateBlockLoop(oType, aType, bType, useAlpha, useBeta) {
      var code = []
      var shapes = [ "od0", "od1", "ad1" ]
      var oOrd = [1, 0]
      var aOrd = [1, 0]
      var bOrd = [0, 1]

      //Do pass over output to zero it out
      code.push.apply(code, generateBetaPass(oType, useBeta))

      for(var i=0; i<3; ++i) {
        code.push(
          "for(var i", i, "=", shapes[i], ";i", i, ">0;){",
            "var w", i, "=", BLOCK_SIZE, ";",
            "if(i", i, "<", BLOCK_SIZE, "){",
              "w", i, "=i", i, ";",
              "i", i, "=0;",
            "}else{",
              "i", i, "-=", BLOCK_SIZE, ";",
            "}")
      }

      code.push.apply(code, start(oOrd, "o", oType, "i0", "i1", "w1"))

      code.push("for(i=0;i<w0;++i){\
    for(j=0;j<w1;++j){\
    var r=0.0;")

      code.push.apply(code, start(aOrd, "a", aType, "(i0+i)", "i2"))
      code.push.apply(code, start(bOrd, "b", bType, "i2", "(i1+j)"))

      code.push("for(k=0;k<w2;++k){")

      code.push("r+=",
        read(aOrd, "a", aType, "(i0+i)", "(i2+k)"), "*",
        read(bOrd, "b", bType, "(i2+k)", "(i1+j)"), ";")

      //Close off k-loop
      code.push.apply(code, walk(aOrd, "a", aType, 0, "(i2+k)"))
      code.push.apply(code, walk(bOrd, "b", bType, 0, "(i2+k)"))
      code.push("}")

      //Write r back to output array
      var sym = "r"
      if(useAlpha) {
        sym = "A*r"
      }
      code.push.apply(code, write(oOrd, "o", oType, "(i0+i)", "(i1+j)",
        sym + "+" + read(oOrd, "o", oType, "(i0+i)", "(i1+j)")))

      //Close off j-loop
      code.push.apply(code, walk(oOrd, "o", oType, 0, "(i1+j)"))
      code.push("}")

      //Close off i-loop
      code.push.apply(code, walk(oOrd, "o", oType, 1, "(i0+i)"))
      code.push("}}}}")

      return code
    }