function createHotReloadModifier(configItems) {
  const isCodeSplit = _.includes(configItems, 'code-split-vendors');
  const isHotReact = _.includes(configItems, 'react-hot-loader');

  if (!isCodeSplit || !isHotReact) {
    return null;
  }

  // More info here: https://stackoverflow.com/a/50217641
  return `if (argv.hot) {
    // Cannot use 'contenthash' when hot reloading is enabled.
    config.output.filename = '[name].[hash].js';
  }
`;
}