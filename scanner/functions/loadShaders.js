function loadShaders (config) {
  let str = 'const shaders = {};\n\n';

  config.forEach(name => {
    str += `shaders['${name}'] = ${JSON.stringify({
      name: name,
      vs: toVar(loadFile(`${baseURL}/src/shader/${name}.vs`)),
      fs: toVar(loadFile(`${baseURL}/src/shader/${name}.fs`))
    })}\n\n`;
  });

  return str;
}