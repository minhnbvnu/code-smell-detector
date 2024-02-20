function ensureComplexArray(input) {
    return complex_array.isComplexArray(input) && input ||
        new ComplexArray(input)
  }