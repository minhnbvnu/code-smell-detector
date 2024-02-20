async function matchingFuntion(resources, sourceName) {
    return await proxyquire('../lib/definition', {
      '../lib/init/prompt': prompt
    }).matchingResourceBySourceName(resources, sourceName);
  }