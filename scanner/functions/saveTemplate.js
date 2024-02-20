async function saveTemplate(baseDir, rosTemplateData) {
  const rosTemplatePath = path.resolve(baseDir, ROS_TEMPLATE_PATH);

  let rosTemplateObj;
  try {
    rosTemplateObj = JSON.parse(rosTemplateData);
  } catch (err) {
    console.error(red(`Unable to parse JSON file ${rosTemplateData}. Error: ${err}`));
  }
  // format output
  await fs.outputFile(rosTemplatePath, JSON.stringify(rosTemplateObj, null, 4));

  return rosTemplateObj;
}