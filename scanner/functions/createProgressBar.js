function createProgressBar(format, options) {
  const opts = Object.assign({
    complete: green('█'),
    incomplete: white('█'),
    width: 20,
    clear: true
  }, options);
  const bar = new ProgressBar(format, opts);
  const old = bar.tick;
  const loadingChars = ['⣴', '⣆', '⢻', '⢪', '⢫'];
  bar.tick = (len, tokens) => {
    const newTokens = Object.assign({
      loading: loadingChars[parseInt(Math.random() * 5)]
    }, tokens);
    old.call(bar, len, newTokens);
  };
  return bar;
}