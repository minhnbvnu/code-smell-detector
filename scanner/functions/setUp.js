function setUp(source){
    const abis = util.getDiffABIs(source);
    const orig = api.abiUtils.generateHumanReadableAbiList([abis.original], abis.original.sha);
    const cur = api.abiUtils.generateHumanReadableAbiList([abis.current], abis.current.sha);
    return api.abiUtils.diff(orig[0], cur[0]);
  }