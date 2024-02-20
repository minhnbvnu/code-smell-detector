function instrumentAndCompile(sourceName, api={ config: {} }) {
  api.config.viaIR = process.env.VIA_IR === "true";
  const contract = getCode(`${sourceName}.sol`)
  const instrumenter = new Instrumenter(api.config);
  const instrumented = instrumenter.instrument(contract, filePath);

  return {
    contract: contract,
    instrumented: instrumented,
    solcOutput: compile(instrumented.contract),
    data: instrumenter.instrumentationData
  }
}