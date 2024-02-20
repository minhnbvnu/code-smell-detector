function assertValidDirectiveName(name) {
    var letter = name.charAt(0);
    if (!letter || letter !== lowercase(letter)) {
      throw $compileMinErr('baddir', "Directive/Component name '{0}' is invalid. The first character must be a lowercase letter", name);
    }
    if (name !== name.trim()) {
      throw $compileMinErr('baddir',
            "Directive/Component name '{0}' is invalid. The name should not contain leading or trailing whitespaces",
            name);
    }
  }