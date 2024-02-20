function modifierWith(statements) {
  return contractWith(`
        modifier b() {
          ${statements}
        }
    `)
}