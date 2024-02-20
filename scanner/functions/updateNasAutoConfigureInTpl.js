function updateNasAutoConfigureInTpl(tplPath, tpl, serviceName) {
  const updatedTplContent = _.cloneDeep(tpl);

  const { serviceRes } = definition.findServiceByServiceName(updatedTplContent.Resources, serviceName);

  if (_.isEmpty(serviceRes['Properties'])) {
    serviceRes.Properties = {
      'NasConfig': 'Auto'
    };
  } else {
    serviceRes.Properties.NasConfig = 'Auto';
  }

  util.outputTemplateFile(tplPath, updatedTplContent);

  console.log(green(`Fun add 'NasConfig: Auto' configuration to ${tplPath}`));

  return updatedTplContent;
}