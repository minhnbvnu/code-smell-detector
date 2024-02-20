async function setupAndRun(solidityFile, val, provider){
    const contract = await util.bootstrapCoverage(solidityFile, api, provider);
    coverage.addContract(contract.instrumented, util.filePath);

    /* some methods intentionally fail */
    try {
      (val)
        ? await contract.instance.a(val, contract.gas)
        : await contract.instance.a(contract.gas);
    } catch(e){}

    return coverage.generate(contract.data, util.pathPrefix);
  }