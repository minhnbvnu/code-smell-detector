async function bundleMain() {
  const inputOptions = {
    plugins: [
      common(),
      nodeResolve({
        modulePaths: [
          resolve(baseDir, '../src'),
          resolve(baseDir, '../node_modules'),
        ],
      }),
      terser(),
    ],
    input: resolve(baseDir, './build/main.js'),
  };

  const outputOptions = {
    dir: resolve(baseDir, './build'),
    format: 'iife',
  };

  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
  bundle.close();
}