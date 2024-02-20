async function updateNasAndVpc(tplPath, tpl, serviceName, nasAndVpcConfig) {
  const { projectTpl, projectTplPath } = await getTplInfo(tpl, tplPath);

  const updatedTplContent = updateNasAndVpcInTpl(projectTplPath, projectTpl, serviceName, nasAndVpcConfig);

  return updatedTplContent;
}