function checkContext(config, tempContractsDir, tempArtifactsDir){
  const ui = new PluginUI(config.logger.log);

  if (!shell.test('-e', config.contractsDir)){

    const msg = ui.generate('sources-fail', [config.contractsDir])
    throw new Error(msg);
  }

  if (shell.test('-e', tempContractsDir)){
    shell.rm('-Rf', tempContractsDir);
  }

  if (shell.test('-e', tempArtifactsDir)){
    shell.rm('-Rf', tempArtifactsDir);
  }
}