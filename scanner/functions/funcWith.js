function funcWith(statements) {
  return contractWith(`
        function b() public {
          ${statements}
        }
    `)
}