function showPackageNextTips(packedYmlPath) {
  const deployTip = 'fun deploy';

  const relative = path.relative(process.cwd(), packedYmlPath);
  const DEFAULT_PACKAGED_YAML_NAME = 'template.packaged.yml';

  let templateParam = '';
  if (relative !== DEFAULT_PACKAGED_YAML_NAME) {
    templateParam = ` -t ${relative}`;
  }

  console.log(yellow(`\nTips for next step
======================
* Deploy Resources: ${deployTip}${templateParam}`));
}