function addPropertyToDecl(aSelf, aDecl, property, w, s, c) {
      aDecl.push(aSelf._createJscsspDeclarationFromValue(property + "-width", w));
      aDecl.push(aSelf._createJscsspDeclarationFromValue(property + "-style", s));
      aDecl.push(aSelf._createJscsspDeclarationFromValue(property + "-color", c));
    }