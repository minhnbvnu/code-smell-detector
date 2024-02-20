async function transformRosYmlCodeUri ({ baseDir, tpl, tplPath, bucketName, ossClient }) {
  if (!ossClient) {
    bucketName = await processOSSBucket();
    ossClient = await getOssClient(bucketName);
  }

  for (const key of Object.keys(tpl.Resources)) {
    const { Type, Properties: properties } = tpl.Resources[key];
    if (Type === 'ALIYUN::FC::Function' && !isCustomContainerRuntime(properties.Runtime) && !properties.Code) {
      if (!properties.CodeUri) {
        throw new Error(`ALIYUN::FC::Function Code is empty.`);
      }

      const ignore = await fc.generateFunIngore(baseDir, properties.CodeUri);
      const oss = await zipCodeToOss({
        tplPath,
        ignore,
        ossClient,
        codeUri: properties.CodeUri,
        runtime: properties.Runtime,
        isRosCodeUri: true
      });

      if (!oss.objectName) {
        throw new Error(`Codeuri ${properties.CodeUri} upload to oss error.`);
      }
      tpl.Resources[key].Properties.Code = {
        OssBucketName: bucketName,
        OssObjectName: oss.objectName
      };
      delete tpl.Resources[key].Properties.CodeUri;
    }
  }
  return tpl;
}