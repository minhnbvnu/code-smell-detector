function loadWorkers (config) {
  let str = 'const workers = {}\n\n';

  for (let name in config) {
    let src = '';
    config[name].forEach(file => {
      src += loadFile(`${baseURL}/${file}\n`);
    });

    str += `workers['${name}'] = '${src.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/ *[\r\n]+ */g, '\\n')}';\n\n`;
  }

  return str;
}