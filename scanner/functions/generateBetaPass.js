function generateBetaPass(oType, useBeta) {
      var code = []
      var oOrd = oType[0] === "r" ? [1,0] : [0,1], symbols
      if(useBeta) {
        code.push("if(B!==1.0){")
      }
      code.push.apply(code, start(oOrd, "o", oType))
      if(oOrd[0]) {
        code.push("for(i=0;i<od0;++i){for(j=0;j<od1;++j){")
        symbols = ["i", "j"]
      } else {
        code.push("for(j=0;j<od1;++j){for(i=0;i<od0;++i){")
        symbols = ["j", "i"]
      }
      if(useBeta) {
        code.push.apply(code, write(oOrd, "o", oType, "i", "j",
          "B*"+read(oOrd, "o", oType, "i", "j")))
      } else {
        code.push.apply(code, write(oOrd, "o", oType, "i", "j", "0"))
      }
      code.push.apply(code, walk(oOrd, "o", oType, 0, symbols[1]))
      code.push("}")
      code.push.apply(code, walk(oOrd, "o", oType, 1, symbols[0]))
      code.push("}")
      if(useBeta) {
        code.push("}")
      }
      return code
    }