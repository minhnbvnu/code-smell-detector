function buildStubs(argv) {
  const stubs = new Map()
  ;['name', 'slug'].forEach(str => {
    // if value is defined
    if (argv[str] !== undefined) {
      stubs.set(new RegExp(`{{\\s?${str}\\s}}`, 'g'), argv[str])
    }
  })
  return stubs
}