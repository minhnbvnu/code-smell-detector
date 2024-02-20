function makeLocalDevConfig() {
  return {
    // TODO - Uncomment when all examples use webpack 4 for faster bundling
    // mode: 'development',

    // suppress warnings about bundle size
    devServer: {
      historyApiFallback: true,
      stats: {
        warnings: false
      }
    },

    devtool: 'source-map',

    resolve: {
      alias: Object.assign(
        {
          react: resolve(__dirname, '../node_modules/react'),
          'react-dom': resolve(__dirname, '../node_modules/react-dom'),
          'math.gl': resolve(__dirname, '../node_modules/math.gl'),
          '@deck.gl/core': resolve(__dirname, '../node_modules/@deck.gl/core'),
          '@deck.gl/layers': resolve(__dirname, '../node_modules/@deck.gl/layers'),
          '@deck.gl/mesh-layers': resolve(__dirname, '../node_modules/@deck.gl/mesh-layers'),
          '@deck.gl/react': resolve(__dirname, '../node_modules/@deck.gl/react'),
          '@luma.gl/addons': resolve(__dirname, '../node_modules/@luma.gl/addons'),
          '@luma.gl/constants': resolve(__dirname, '../node_modules/@luma.gl/constants'),
          '@luma.gl/core': resolve(__dirname, '../node_modules/@luma.gl/core'),
          '@luma.gl/shadertools': resolve(__dirname, '../node_modules/@luma.gl/shadertools'),
          '@luma.gl/webgl': resolve(__dirname, '../node_modules/@luma.gl/webgl'),
          '@luma.gl/webgl-state-tracker': resolve(
            __dirname,
            '../node_modules/@luma.gl/webgl-state-tracker'
          ),
          '@luma.gl/webgl2-polyfill': resolve(__dirname, '../node_modules/@luma.gl/webgl2-polyfill')
        },
        ALIASES
      )
    },
    module: {
      rules: [
        {
          // Unfortunately, webpack doesn't import library sourcemaps on its own...
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre'
        }
      ]
    }
  };
}