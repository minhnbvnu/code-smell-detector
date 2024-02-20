function extractClassesAndMethods(code) {
      var s = code;
      s = s.replace(classesRegex, function(all) {
        return addAtom(all, "E")
      });
      s = s.replace(methodsRegex, function(all) {
        return addAtom(all, "D")
      });
      s = s.replace(functionsRegex, function(all) {
        return addAtom(all, "H")
      });
      return s
    }