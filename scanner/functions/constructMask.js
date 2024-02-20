function constructMask() {

    excludeMonitorsFilter = "";
    for (var i = 0; i < excludeMonitors.length; i++) {
      excludeMonitorsFilter = excludeMonitorsFilter + "/"+"MonitorId !=:" + excludeMonitors[i];
    }
    NVR.debug("Constructed Monitor Filter =" + excludeMonitorsFilter);
  }