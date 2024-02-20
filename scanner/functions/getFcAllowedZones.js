async function getFcAllowedZones() {
  const fc = await getFcClient();

  const fcRs = await fc.getAccountSettings();

  const fcAllowedZones = fcRs.data.availableAZs;

  debug('fc allowed zones: %j', fcAllowedZones);

  if (_.isEqual(fcAllowedZones, [''])) {

    const profile = await getProfile();

    throw new Error(red(`No fc vswitch zones allowed, you may need login to fc console to apply for VPC feature: https://fc.console.aliyun.com/overview/${profile.defaultRegion}`));
  }

  return fcAllowedZones;
}