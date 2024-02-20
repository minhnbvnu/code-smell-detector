function getConfigProcessesName(drivers) {
  const driversName = Object.keys(drivers);
  const processesName = [];

  if (driversName && driversName.length) {
    for (const driverName of driversName) {
      if (driverName === 'chrome') {
        processesName.push('chromedriver');
      } else if (driverName === 'firefox') {
        processesName.push('geckodriver');
      } else if (driverName === 'chromiumedge') {
        processesName.push('msedgedriver');
      } else if (driverName === 'ie') {
        processesName.push('IEDriverServer');
      } else if (driverName === 'safari') {
        processesName.push('safaridriver');
      } else {
        processesName.push(driverName);
      }
    }
  }
  return processesName;
}