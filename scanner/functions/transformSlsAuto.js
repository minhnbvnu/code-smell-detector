async function transformSlsAuto(tpl) {
  const cloneTpl = _.cloneDeep(tpl);

  const servicesNeedUpdate = [];
  iterateResources(cloneTpl.Resources, SERVICE_RESOURCE, (serviceName, serviceRes) => {
    const logConfig = (serviceRes.Properties || {}).LogConfig;

    if (logConfig === 'Auto') {
      servicesNeedUpdate.push({
        serviceName,
        serviceRes
      });
    }
  });

  if (_.isEmpty(servicesNeedUpdate)) { return cloneTpl; }

  const projectName = `fc-${uuid.v1()}`;
  const logstoreName = 'function-log';

  for (const { serviceRes } of servicesNeedUpdate) {
    const serviceProp = (serviceRes.Properties || {});

    serviceProp.LogConfig = generateServiceLogConfig(projectName, logstoreName);
  }

  Object.assign(cloneTpl.Resources, generateRosTemplateForSLS(projectName, logstoreName));

  return cloneTpl;
}