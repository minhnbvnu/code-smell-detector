function funymlToFunfile(funymlPath) {

  const funModule = FunModule.load(funymlPath);
  const runtime = funModule.runtime;
  let firstAptCmd = true;
  let firstShellCmd = true;

  const content = [];

  content.push(`RUNTIME ${runtime}`);
  content.push('WORKDIR /code');

  for (const t of funModule.tasks) {
    let env = resolveEnv(t.attrs.env).join(' ');
    if (!_.isEmpty(env)) {
      env = ' ' + env;
    }
    
    const target = t.attrs.target;
    let targetParameter = '';

    if (target) {
      targetParameter = ` -t ${target}`;
    }

    const cwd = t.attrs.cwd;

    let cwdCmd = '';

    if (cwd) {
      cwdCmd = ` cd ${cwd} &&`;
    }

    switch (t.type) {
    case 'pip': {
      if (t.attrs.local) {
        content.push(`RUN${cwdCmd}${env} fun-install pip install ${t.attrs.pip}${targetParameter}`);
      } else {
        content.push(`RUN${cwdCmd}${env} pip install ${t.attrs.pip}`);
      }
      break;
    }
    case 'apt': {
      if (t.attrs.local) {
        content.push(`RUN${cwdCmd}${env} fun-install apt-get install ${t.attrs.apt}${targetParameter}`);
      } else {
        if (firstAptCmd) {
          content.push(`RUN apt-get update`);
        }
        content.push(`RUN${cwdCmd}${env} apt-get install ${t.attrs.apt}`);
      }

      firstAptCmd = false;
      break;
    }
    case 'shell': {
      // If add `COPY . /code` all the time, there is no way to reuse the docker build cache.
      // However, without `COPY . /code`, it may encounter exceptions when depending resources on code.
      // So now add `COPY . /code` only if funyml contains shell cmd
      // see https://github.com/alibaba/funcraft/issues/483
      // see https://github.com/alibaba/funcraft/issues/448
      if (firstShellCmd) {
        content.push('COPY . /code');
        firstShellCmd = false;
      }

      const commands = _.split(t.attrs.shell, '\n');

      let first = true;
      for (const command of commands) {
        if (command) {
          if (first) {
            content.push(`RUN${cwdCmd}${env} ${command}`);
            first = false;
          } else {
            const lastCommand = content.pop();
            content.push(`${lastCommand} \\`);
            content.push(` ${env} ${command}`);
          }
        }
      }

      break;
    }
    default:
      console.error('unkown task %s', t);
    }
  }

  return content.join('\n');
}