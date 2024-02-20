function getNasPathAndServiceFromNasUri(nasUri, tpl) {
  var { nasPath, serviceName } = parseNasUri(nasUri);
  // 此时 nasDir 的格式应为 nas://${ serviceName }${ mountDir }
  if (serviceName === '') {
    serviceName = getDefaultService(tpl);
  }
  return { nasPath, serviceName };
}