function getGeneratorEntries(generator) {
    var generatorResult = generator.next();
    var accumulator = [ generatorResult.value ];
    while (generatorResult.done === false) {
      generatorResult = generator.next();
      accumulator.push(generatorResult.value);
    }
    return accumulator;
  }