function transformVarDefinition(def, defaultTypeValue) {
      var eqIndex = def.indexOf("=");
      var name, value, isDefault;
      if (eqIndex < 0) {
        name = def;
        value = defaultTypeValue;
        isDefault = true
      } else {
        name = def.substring(0, eqIndex);
        value = transformExpression(def.substring(eqIndex + 1));
        isDefault = false
      }
      return new AstVarDefinition(trim(name.replace(/(\s*"C\d+")+/g, "")), value, isDefault)
    }