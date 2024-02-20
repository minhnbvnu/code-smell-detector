function packModules (callback) {
  webpack({
    mode: 'development',
    entry: `${__dirname}/src/icons/triangulateSVG.js`,
    output: {
      path: `${__dirname}/lib`,
      filename: 'triangulateSVG.js'
    },
  }, (err, stats) => {
    if (err) {
      callback(err);
    }

    const content = fs.readFileSync(`${__dirname}/lib/triangulateSVG.js`).toString().replace(/π/g, 'PI');
    fs.writeFileSync(`${__dirname}/lib/triangulateSVG.js`, content);
    callback();
  });
}