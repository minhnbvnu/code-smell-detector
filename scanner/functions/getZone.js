function getZone(dt, tz) {
      var utcMillis = typeof dt === 'number' ? dt : new Date(dt).getTime();
      var t = tz;
      var zoneList = _this.zones[t];
      // Follow links to get to an actual zone
      while (typeof zoneList === "string") {
        t = zoneList;
        zoneList = _this.zones[t];
      }
      if (!zoneList) {
        // Backward-compat file hasn't loaded yet, try looking in there
        if (!_this.loadedZones.backward) {
          //This is for backward entries like "America/Fort_Wayne" that
          // getRegionForTimezone *thinks* it has a region file and zone
          // for (e.g., America => 'northamerica'), but in reality it's a
          // legacy zone we need the backward file for.
          _this.loadZoneFile('backward');
          return getZone(dt, tz);
        }
        invalidTZError(t);
      }
      if (zoneList.length === 0) {
        throw new Error('No Zone found for "' + tz + '" on ' + dt);
      }
      //Do backwards lookup since most use cases deal with newer dates.
      for (var i = zoneList.length - 1; i >= 0; i--) {
        var z = zoneList[i];
        if (z[3] && utcMillis > z[3]) break;
      }
      return zoneList[i+1];
    }