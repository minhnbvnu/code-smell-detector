function expectConstructConfigs(invoke) {
    expect(invoke.serviceName).to.eql(serviceName);
    expect(invoke.serviceRes).to.eql(serviceRes);
    expect(invoke.functionName).to.eql(functionName);
    expect(invoke.functionRes).to.eql(functionRes);
    expect(invoke.functionProps).to.eql(functionProps);
    expect(invoke.debugPort).to.eql(debugPort);
    expect(invoke.debugIde).to.eql(debugIde);
    expect(invoke.baseDir).to.eql(baseDir);

    expect(invoke.runtime).to.eql(functionProps.Runtime);
    expect(invoke.codeUri).to.eql(process.cwd());
  }