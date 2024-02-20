async function deployFlow(name, resource, tpl, parameterOverride = {}, baseDir) {
  const properties = (resource.Properties || {});
  const description = properties.Description || '';
  let definition;
  if (properties.Definition) {
    definition = transformFlowDefinition(properties.Definition, tpl, parameterOverride);
  } else if (properties.DefinitionUri) {
    const definitionUri = path.resolve(baseDir, properties.DefinitionUri);
    const definitionObj = parseYamlWithCustomTag(properties.DefinitionUri, await fs.readFile(definitionUri, 'utf8'));
    ({ definition } = transformFunctionInDefinition(definitionObj, tpl, parameterOverride));
  } else {
    throw new Error(`${name} should have Definition or DefinitionUri`);
  }
  const roleArn = properties.Role;
  const policies = properties.Policies;

  const profile = await getProfile();
  const defaultRegion = profile.defaultRegion;

  let role;
  let roleName;
  if (!roleArn && policies) {
    roleName = `aliyunfnfgeneratedrole-${defaultRegion}-${name}`;
    roleName = normalizeRoleOrPoliceName(roleName);
    console.log(`\tmake sure role '${roleName}' is exist`);
    role = await makeRole(
      roleName,
      true,
      'Function Flow Default Role',
      FNF_ASSUME_ROLE_POLICY
    );
    console.log(green(`\trole '${roleName}' is already exist`));
    console.log('\tattaching policies ' + policies + ' to role: ' + roleName);
    await deployPolicies(name, roleName, policies, 'FnF');
    console.log(green('\tattached policies ' + policies + ' to role: ' + roleName));
  }

  await makeFlow({
    name,
    definition,
    description,
    roleArn: ((role || {}).Role || {}).Arn || roleArn
  });
}