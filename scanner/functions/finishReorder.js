function finishReorder(match_reorder, no_init_packery) {
      currentStreamState = simulStreaming ? streamState.ACTIVE : streamState.SNAPSHOT;

      //console.log ("AFTER REORDER="+JSON.stringify(beforeReorderPositions));

      for (var i = 0; i < $scope.MontageMonitors.length; i++) {
        $scope.MontageMonitors[i].Monitor.connKey = NVR.regenConnKeys($scope.MontageMonitors[i]);
      }

      if (match_reorder) {
        var ps = NVR.getLogin().packeryPositions;
        var p = parsePositions(ps);
        matchMonitorsToPositions(p);
      } else {
        NVR.debug('Not calling matchReorder');
      }

      if (!no_init_packery) { initPackery(); }
      // ld.packeryPositions = JSON.stringify(beforeReorderPositions);
    }