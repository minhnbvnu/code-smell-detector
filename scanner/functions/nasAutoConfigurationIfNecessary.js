async function nasAutoConfigurationIfNecessary({ stage, tplPath, runtime, codeUri, nasConfig, vpcConfig, useNas = false, assumeYes,
  compressedSize = 0,
  nasFunctionName,
  isRosCodeUri,
  nasServiceName
}) {

  let stop = false;
  let tplChanged = false;
  const packageStage = (stage === 'package');
  const ossUploadCodeSize = process.env['FUN_OSS_UPLOAD_CODE_SIZE'] || 104857600;
  const tipOssUploadCodeSize = Math.floor(ossUploadCodeSize / 1024 / 1024);
  const maxCodeSize = packageStage ? ossUploadCodeSize : 52428800;

  if (isRosCodeUri || !_.includes(SUPPORT_RUNTIMES, runtime) || (!useNas && compressedSize < maxCodeSize)) { return { stop, tplChanged }; }

  if (compressedSize > maxCodeSize) {
    if (packageStage) {
      console.log(red(`\nFun detected that your function ${nasServiceName}/${nasFunctionName} sizes exceed ${tipOssUploadCodeSize}M. It is recommended that using the nas service to manage your function dependencies.`));
    } else {
      console.log(red(`\nFun detected that your function ${nasServiceName}/${nasFunctionName} sizes exceed 50M.`));
      if (compressedSize < ossUploadCodeSize) {
        const tipSDKMessage = `Use OSS bucket/object  as a function code, the codeSizeLimit can be expanded to ${tipOssUploadCodeSize}M.You can deploy function with command "fun package && fun deploy"`;
        if (await promptForConfirmContinue(tipSDKMessage)) {
          const { execSync } = require('child_process');
          console.log(`Executing command 'fun package && fun deploy'...`);
          await execSync('fun package && fun deploy', { stdio: 'inherit' });
        }
        process.exit(-1); // eslint-disable-line
      } else {
        console.log(red(`It is recommended that using the nas service to manage your function dependencies.`));
      }
    }
  }

  const alreadyConfirmed = await checkAlreadyConfirmedForCustomSpringBoot(runtime, codeUri);

  await ensureCodeUriForJava(codeUri, nasServiceName, nasFunctionName);

  if (assumeYes || alreadyConfirmed || await promptForConfirmContinue(`Do you want to let fun to help you automate the configuration?`)) {
    const tpl = await getTpl(tplPath);

    if (definition.isNasAutoConfig(nasConfig)) {
      const nasAutoMsg = `You have already configured 'NasConfig: Auto’. We want to use this configuration to store your function dependencies.`;
      if (assumeYes || alreadyConfirmed || await promptForConfirmContinue(nasAutoMsg)) {
        if (assumeYes) { console.log(nasAutoMsg); }
        if (packageStage && !_.isEmpty(vpcConfig)) {
          throw new Error(`When 'NasConfig: Auto' is specified, 'VpcConfig' is not supported.`);
        }
        await backupTemplateFile(tplPath); // backup tpl

        tplChanged = await processNasAutoConfiguration({
          tpl, tplPath, runtime, codeUri, stage,
          serviceName: nasServiceName,
          functionName: nasFunctionName
        });

        stop = true;
      } else {
        throw new Error(red(`\nIf 'NasConfig: Auto' is configured, only the configuration store function dependency is currently supported.`));
      }
    } else if (!_.isEmpty(vpcConfig) && _.isEmpty(nasConfig)) {

      throw new Error(red(`\nFun has detected that you only have VPC configuration. This scenario is not supported at this time. You also need to manually configure the NAS service. You can refer to: https://github.com/alibaba/funcraft/blob/master/docs/specs/2018-04-03-zh-cn.md#nas-%E9%85%8D%E7%BD%AE%E5%AF%B9%E8%B1%A1 and https://nas.console.aliyun.com/`));
    } else if (!_.isEmpty(vpcConfig) && !_.isEmpty(nasConfig)) {

      if (packageStage) {
        throw new Error(`When 'NasConfig' is specified, 'VpcConfig' is not supported.`);
      }
      if (definition.onlyOneNASExists(nasConfig)) {
        const assumeYesMsg = `We have detected that you already have a NAS configuration. Fun will directly use this NAS storage function dependencies.`;
        const confirmMsg = `We have detected that you already have a NAS configuration. Do you directly use this NAS storage function dependencies.`;

        if (assumeYes || alreadyConfirmed || await promptForConfirmContinue(confirmMsg)) {
          if (assumeYes) { console.log(assumeYesMsg); }

          await backupTemplateFile(tplPath);

          tplChanged = await processNasAutoConfiguration({
            tpl, tplPath, runtime, codeUri, stage,
            serviceName: nasServiceName,
            functionName: nasFunctionName
          });
        } else {
          throw new Error(red(`If your yml has been already configured with 'NasConfig', fun only supports to use this 'NasConfig' to process your function dependencies. Otherwise you need to handle the dependencies by yourself.\n\nRefer to https://yq.aliyun.com/articles/712700 for more help.`));
        }
      } else {
        const answer = await promptForMountPoints(nasConfig.MountPoints);
        const convertedNasConfig = replaceNasConfig(nasConfig, answer.mountDir);
        await backupTemplateFile(tplPath);

        tplChanged = await processNasAutoConfiguration({
          tpl, tplPath, runtime, codeUri, stage,
          convertedNasConfig,
          serviceName: nasServiceName,
          functionName: nasFunctionName
        });
      }

      stop = true;
    } else if (_.isEmpty(vpcConfig) && _.isEmpty(nasConfig)) {
      const yes = await promptForConfirmContinue(`We recommend using the 'NasConfig: Auto' configuration to manage your function dependencies.`);
      if (assumeYes || yes) {
        await backupTemplateFile(tplPath);
        // write back to yml
        const updatedTpl = await updateNasAutoConfigure(tplPath, tpl, nasServiceName);

        tplChanged = await processNasAutoConfiguration({
          tpl: updatedTpl, tplPath, runtime, codeUri, stage,
          serviceName: nasServiceName,
          functionName: nasFunctionName
        });
      } else {
        // list available NAS
        const { mountTarget, securityGroupId } = await processNasSelection();

        await backupTemplateFile(tplPath); // backup tpl

        const nasAndVpcConfig = generateNasAndVpcConfig(mountTarget, securityGroupId, nasServiceName);
        const updatedTpl = await updateNasAndVpc(tplPath, tpl, nasServiceName, nasAndVpcConfig);

        tplChanged = await processNasAutoConfiguration({
          tpl: updatedTpl, tplPath, runtime, codeUri, stage,
          serviceName: nasServiceName,
          functionName: nasFunctionName
        });
      }
      stop = true;
    }
  }

  return {
    stop,
    tplChanged
  };
}