function installDouble(contracts, test, config) {
  const configjs = getSolcoverJS(config);

  // Scaffold
  shell.mkdir(temp);
  shell.cp('-Rf', templatePath, temp);

  // Contracts
  contracts.forEach(item => {
    (item.includes('.'))
      ? shell.cp(`${sourcesPath}${item}`, `${temp}/contracts/${item}`)
      : shell.cp(`${sourcesPath}${item}.sol`, `${temp}/contracts/${item}.sol`);
  });

  // Test
  shell.cp(`${testPath}${test}`, `${temp}/test/${test}`);

  // Configs
  fs.writeFileSync(`${temp}/${hardhatConfigName}`, getHardhatConfigJS());
  fs.writeFileSync(configPath, configjs);

  decacheConfigs();
}