function generateUsageTabs(isFPFn) {
  return isFPFn ? ['commonjs', 'es2015', 'esm'] : ['commonjs', 'umd', 'es2015', 'esm']
}