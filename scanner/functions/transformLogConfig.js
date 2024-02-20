async function transformLogConfig(logConfig) {
  if (definition.isLogConfigAuto(logConfig)) {
    const defaultLogConfig = await generateDefaultLogConfig();

    console.log(yellow(`\tusing 'LogConfig: Auto'. Fun will generate default sls project.`));
    console.log(`\tproject: ${defaultLogConfig.project}, logstore: ${defaultLogConfig.logstore}\n`);

    const description = 'create default log project by fun';
    await makeSlsAuto(defaultLogConfig.project, description, defaultLogConfig.logstore);

    return defaultLogConfig;
  }

  return {
    project: logConfig.Project || '',
    logstore: logConfig.Logstore || '',
    enableRequestMetrics: logConfig.EnableRequestMetrics || false,
    enableInstanceMetrics: logConfig.EnableInstanceMetrics || false
  };
}