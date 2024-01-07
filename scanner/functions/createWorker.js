function createWorker(config, onMessage) {
  const lib = Object.keys(config.lib || {}).map(function (name) {
    return 'const ' + name + ' = ' + config.lib[name].toString() + ';';
  });

  const lines = lib.concat([
    'const __minion__ = (' + createMinion.toString() + ')(',
    config.operation.toString(),
    ');',
    'self.addEventListener("message", function(event) {',
    '  const buffer = __minion__(event.data);',
    '  self.postMessage({buffer: buffer, meta: event.data.meta}, [buffer]);',
    '});',
  ]);

  const worker = new Worker(
    typeof Blob === 'undefined'
      ? 'data:text/javascript;base64,' +
        Buffer.from(lines.join('\n'), 'binary').toString('base64')
      : URL.createObjectURL(new Blob(lines, {type: 'text/javascript'})),
  );
  worker.addEventListener('message', onMessage);
  return worker;
}