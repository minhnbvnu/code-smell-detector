function taskShaders (shaders) {
  const src = 'src/shader';

  let str = 'const shaders = {};\n\n';

  shaders.forEach(name => {
    str += `shaders['${name}'] = ${JSON.stringify({
      name: name,
      vs: escapeCode(readFiles([`${src}/${name}.vs`]), 'ascii'),
      fs: escapeCode(readFiles([`${src}/${name}.fs`]), 'ascii')
    })};\n\n`;
  });

  return str;
}