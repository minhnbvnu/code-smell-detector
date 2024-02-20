function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}