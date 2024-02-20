async function invokeFuntion(invokeName, options) {

    await proxyquire('../lib/commands/invoke.js', {
      '../fc': fc,
      '../tpl': tpl,
      '../init/prompt': prompt,
      '../utils/file': file,
      '../../lib/commands/validate': validate,
      '../../lib/import/service': service
    })(invokeName, options);
  }