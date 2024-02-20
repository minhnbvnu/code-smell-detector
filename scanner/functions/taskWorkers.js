function taskWorkers (workers) {
  let str = 'const workers = {};\n\n';

  for (let name in workers) {
    const content = readFiles(workers[name]);

    taskLint(content);

    const minified = minify(content);
    const escaped = escapeCode(minified);

    str += `workers['${name}'] = '${escaped}';\n\n`;
  }

  return str;
}