async function deployFunctions({ baseDir, serviceName, serviceRes, onlyConfig, tplPath, skipTrigger, useNas, assumeYes }) {
  const serviceProps = serviceRes.Properties || {};

  let deployedFunctions = [];
  let tplChanged;

  do {
    tplChanged = false;

    for (const [k, v] of Object.entries(serviceRes)) {
      if ((v || {}).Type === FUNCTION_TYPE) {
        if (_.includes(deployedFunctions, k)) { continue; }

        const beforeDeployLog = onlyConfig ? 'config to be updated' : 'to be deployed';
        const afterDeployLog = onlyConfig ? 'config update success' : 'deploy success';

        console.log(`\tWaiting for function ${k} ${beforeDeployLog}...`);

        const rs = await deployFunction({ baseDir, serviceName, onlyConfig, tplPath, skipTrigger, useNas,
          functionName: k,
          functionRes: v,
          nasConfig: serviceProps.NasConfig,
          vpcConfig: serviceProps.VpcConfig,
          assumeYes
        });
        deployedFunctions.push(k);
        console.log(green(`\tfunction ${k} ${afterDeployLog}`));

        if (rs.tplChanged) {
          serviceRes = await reloadServiceRes(tplPath, serviceName);
          tplChanged = true;
          break;
        }
      }
    }
  } while (tplChanged);
}