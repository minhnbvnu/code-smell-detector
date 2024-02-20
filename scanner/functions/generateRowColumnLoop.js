function generateRowColumnLoop(oType, aType, bType, useAlpha, useBeta) {
      var code = []
      var oOrd = oType[0] === "r" ? [1,0] : [0,1], aOrd = [1, 0], bOrd = [0, 1]
      var symbols = ["i", "j"]

      code.push.apply(code, start(oOrd, "o", oType))

      if(oOrd[1]) {
        code.push("for(j=0;j<od1;++j){")
        code.push("for(i=0;i<od0;++i){")
      } else {
        code.push("for(i=0;i<od0;++i){")
        code.push("for(j=0;j<od1;++j){")
      }

      code.push.apply(code, start(aOrd, "a", aType, "i"))
      code.push.apply(code, start(bOrd, "b", bType, undefined, "j"))

      code.push(
          "var r=0.0;",
          "for(k=0;k<ad1;++k){",
          "r+=",
            read(aOrd, "a", aType, "i", "k"), "*",
            read(bOrd, "b", bType, "k", "j"), ";")

      //Terminate k loop
      code.push.apply(code, walk(aOrd, "a", aType, 0, "k"))
      code.push.apply(code, walk(bOrd, "b", bType, 0, "k"))
      code.push("}")

      //Write r to output
      if(useAlpha) {
        code.push("r*=A;")
      }
      if(useBeta) {
        code.push("r+=B*", read(oOrd, "o", oType, "i", "j"), ";")
      }
      code.push.apply(code, write(oOrd, "o", oType, "i", "j", "r"))

      //Terminate j loop loop
      code.push.apply(code, walk(oOrd, "o", oType, 0, symbols[1]))
      code.push("}")

      //Terminate i loop
      code.push.apply(code, walk(oOrd, "o", oType, 1, symbols[0]))
      code.push("}")

      return code
    }