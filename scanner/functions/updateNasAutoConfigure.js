async function updateNasAutoConfigure(tplPath, tpl, serviceName) {
  const { projectTpl, projectTplPath } = await getTplInfo(tpl, tplPath);

  const updatedTplContent = await updateNasAutoConfigureInTpl(projectTplPath, projectTpl, serviceName);
  return updatedTplContent;
}