async function uploadAndUpdateFunctionCode({ tpl, tplPath, useNas, baseDir, ossClient }) {
  let updatedTplContent = _.cloneDeep(tpl);

  let processed;
  let zlibOptions = {};
  do {
    if (processed) {
      console.log(yellow(`\nFun will execute the ‘fun package’ again.`));
    }
    processed = false;

    const codeUriCache = new Map();

    for (const {serviceName, serviceRes, functionName, functionRes} of definition.findFunctionsInTpl(updatedTplContent)) {
      const runtime = (functionRes.Properties || {}).Runtime;
      if (isCustomContainerRuntime(runtime)) {
        delete (functionRes.Properties || {}).CodeUri;
        continue;
      }

      if (isOssUrl((functionRes.Properties || {}).CodeUri)) { continue; }

      const codeUri = (functionRes.Properties || {}).CodeUri;
      const absCodeUri = path.resolve(baseDir, codeUri);

      if (!await fs.pathExists(absCodeUri)) {
        throw new Error(`codeUri ${absCodeUri} is not exist`);
      }
      if (codeUriCache.get(absCodeUri)) {
        functionRes.Properties.CodeUri = codeUriCache.get(absCodeUri);
        continue;
      }

      const ignore = await fc.generateFunIngore(baseDir, codeUri);

      const rs = await zipCodeToOss({
        ossClient, codeUri: absCodeUri, runtime, ignore, tplPath, useNas,
        serviceName, functionName, nasConfig: (serviceRes.Properties || {}).NasConfig,
        zlibOptions
      });

      if (!rs.objectName && rs.isEmpty) {
        throw new Error(`code.zip for Codeuri ${codeUri} could not be empty.`);
      }
      if (rs.stop) {
        processed = true;
        useNas = false;
        zlibOptions.level = 1;
        updatedTplContent = await getTpl(tplPath);
        break;
      }

      const resolveCodeUri = `oss://${ossClient.options.bucket}/${rs.objectName}`;
      functionRes.Properties.CodeUri = resolveCodeUri;
      codeUriCache.set(absCodeUri, resolveCodeUri);
    }
  } while (processed);

  return updatedTplContent;
}