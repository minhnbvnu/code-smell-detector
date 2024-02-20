function validateNasAndVpcConfig(resources) {
  if (_.isEmpty(resources)) { return; }

  for (const [name, resource] of Object.entries(resources)) {
    if (resource.Type === SERVICE_RESOURCE) {
      const serviceprop = (resource.Properties || {});
      const vpcConfig = serviceprop.VpcConfig;
      const nasConfig = serviceprop.NasConfig;

      if (isNasAutoConfig(nasConfig) && !_.isEmpty(vpcConfig) && !isVpcAutoConfig(vpcConfig)) {
        throw new Error(`\nVpcConfig is not supported by 'NasConfig:Auto' in service: ${name}`);
      }
    }
  }
}