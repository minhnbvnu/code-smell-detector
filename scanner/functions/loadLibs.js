function loadLibs (config) {
  let str = '';
  config.forEach(file => {
    str += loadFile(`${baseURL}/${file}\n`);
  });

  return str;
}