async function partialDeployment(sourceName, tpl) {
    return await proxyquire('../../lib/deploy/deploy-by-tpl', {
      '../../lib/init/prompt': prompt
    }).partialDeployment(sourceName, tpl);
  }