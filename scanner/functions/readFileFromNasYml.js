async function readFileFromNasYml(nasYmlPath) {

  if (!await fs.pathExists(nasYmlPath)) {
    return {};
  }
  const contentStr = await fs.readFile(nasYmlPath, 'utf8');

  if (!contentStr) { return {}; }

  let contentObj;

  try {
    contentObj = yaml.safeLoad(contentStr, {
      schema: yaml.JSON_SCHEMA
    });
  } catch (e) {
    throw new Error(`\nThere was a problem with parsing ${nasYmlPath}. Ensure it is valid YAML!
${e}

After .nas.yml is configured correctly. You may be able to redeploy resources by following two steps:

1. Execute 'fun nas sync' to upload local NAS resources to the NAS service.
2. Execute ‘fun deploy’ to deploy resources to function computer.
`);
  }

  return contentObj || {};
}