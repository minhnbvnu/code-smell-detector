function addInsightParams(insightParms, msg) {
  var params = insightParms.split("|");

  // Whether the device is ON or OFF (1 or 0)
  msg.state = params[0];
  
  // The date and time when the device was last turned on or off (as a Unix timestamp)
  msg.onSince = parseInt(params[1]);
  
  // How long the device was last ON for (seconds)
  msg.onFor = parseInt(params[2]);

  // How long the device has been ON today (seconds)
  msg.onToday = parseInt(params[3]);
  
  // How long the device has been ON total (seconds)
  msg.onTotal = parseInt(params[4]);
  
  // Timespan over which onTotal is relevant (seconds). Typically 2 weeks except when first started up.
  //msg.timespan = parseInt(params[5]);
  
  // Average power consumption (Watts)
  msg.averagePower = parseInt(params[6]);
  
  // Current power consumption (Watts).  Conversion required because the value is delivered in milliWatts.
  // It is called 'power' (instead of currentPower) for backwards compatibility ...
  msg.power = params[7]/1000;
  
  // Energy used today (Watt-hours, or Wh)
  msg.energyToday = parseInt(params[8]);
  
  // Energy used in total (Wh)
  msg.energyTotal = parseFloat(params[9]);
  
  // The 10-th parameter is not always available
  if (params[10]) {
    // Minimum energy usage to register the insight as switched on ( milliwats, default 8000mW, configurable via WeMo App)
    msg.standbyLimit = parseInt(params[10]);
  }
}