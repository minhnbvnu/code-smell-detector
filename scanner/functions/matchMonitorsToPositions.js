function matchMonitorsToPositions(positions, mon) {
  var ld = NVR.getLogin();
  var layouttype = false;

  if (ld.currentMontageProfile == '__reorder__') {
    NVR.debug ('You manually messed with the profile, so skipping all matches');
    return;
  }

  console.log ("matchMonitor positions:"+JSON.stringify(positions));
  if (!mon) { mon = $scope.MontageMonitors;}
  if (!mon) { return;}
  var disabled_display;
  // hide disabled monitors when no profile is used
  if (!ld.currentMontageProfile || ld.currentMontageProfile == $translate.instant('kMontageDefaultProfile')) {
    disabled_display = 'noshow';
  } else {
    disabled_display = 'blank';
  }

  NVR.debug ('We are in profile:'+ld.currentMontageProfile+" so disabled monitors is "+disabled_display);
  NVR.debug ('Passed profile is: '+JSON.stringify(positions));
  if (!positions.length) layouttype = true;
  var found = false;
  var monitor_found = false;
  for (var m=0; m < mon.length; m++){
    monitor_found = false;
    for (var p=0; p < positions.length; p++) {
      if (mon[m].Monitor.Id == positions[p].attr) {
        NVR.debug ('Monitor '+positions[p].attr+ ' found in position array with listDisplay='+positions[p].display);
        found = true;
        monitor_found = true;
        if (mon[m].Monitor.Function == 'None' && positions[p].display!='noshow') {
          NVR.debug (ld.currentMontageProfile + '=>None Function: Making '+mon[m].Monitor.Name+' to "'+disabled_display+'" as this is disabled in the current ZM run state');
          positions[p].display=disabled_display;
          mon[m].Monitor.listDisplay = disabled_display;
        }
        if (mon[m].Monitor.Function != 'None' && positions[p].display!='noshow') {
          NVR.debug (ld.currentMontageProfile + '=>Making '+mon[m].Monitor.Name+' to show  as this is enabled in the current ZM run state');
          positions[p].display='show';
          mon[m].Monitor.listDisplay = 'show';
        }
      }
    } // pos

    if (!monitor_found && !$scope.currentZMGroupName) {
      NVR.debug (mon[m].Monitor.Name+' not found, profile='+ld.currentMontageProfile+' and group='+$scope.currentZMGroupName);
      mon[m].Monitor.listDisplay = ((ld.currentMontageProfile == $translate.instant('kMontageDefaultProfile')  || !positions.length)) ?'show':'noshow';
      NVR.debug (ld.currentMontageProfile + '=> Making '+mon[m].Monitor.Name+' to '+mon[m].Monitor.listDisplay+' as this monitor was not found in profile');
    }
    /* if (!found) {
        NVR.debug ('********************* monitor not in this profile: '+mon[m].Monitor.Name);
       layouttype = true;
      }*/
  } //mon

  NVR.debug('after matchMontageProfile, will packery re-init? '+ layouttype);
  NVR.setMonitors(mon);
  $scope.monitors = mon;
  return layouttype;
}