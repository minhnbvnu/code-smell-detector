function generateOutput(stack, token, data, options) {
  var result;

  if (token === 'text') {
    result = pushText(data, options);
  } else if (token === 'display') {
    result = handleDisplay(stack, data, options);
  } else if (token === 'xterm256') {
    result = pushForegroundColor(stack, options.colors[data]);
  } else if (token === 'rgb') {
    result = handleRgb(stack, data);
  }

  return result;
}