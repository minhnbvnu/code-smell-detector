function updateNasAndVpcInTpl(tplPath, tpl, serviceName, nasAndVpcConfig) {
  const updatedTplContent = _.cloneDeep(tpl);

  const { serviceRes } = definition.findServiceByServiceName(updatedTplContent.Resources, serviceName);

  if (_.isEmpty(serviceRes['Properties'])) {
    serviceRes.Properties = nasAndVpcConfig;
  } else {
    serviceRes.Properties.VpcConfig = nasAndVpcConfig.VpcConfig;
    serviceRes.Properties.NasConfig = nasAndVpcConfig.NasConfig;
  }

  console.log(green(`Fun add 'NasConfig' and 'VpcConfig' configuration to your template.yml.`));

  util.outputTemplateFile(tplPath, updatedTplContent);
  return updatedTplContent;
}