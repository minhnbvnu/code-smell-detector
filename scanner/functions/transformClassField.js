function transformClassField(statement) {
      var attrAndType = attrAndTypeRegex.exec(statement);
      var isStatic = attrAndType[1].indexOf("static") >= 0;
      var definitions = statement.substring(attrAndType[0].length).split(/,\s*/g);
      var defaultTypeValue = getDefaultValueForType(attrAndType[2]);
      for (var i = 0; i < definitions.length; ++i) definitions[i] = transformVarDefinition(definitions[i], defaultTypeValue);
      return new AstClassField(definitions, attrAndType[2], isStatic)
    }