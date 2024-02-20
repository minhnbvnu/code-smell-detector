function getRegionForTimezone(tz) {
      var exc = regionExceptions[tz]
        , reg
        , ret;
      if (exc) return exc;
      reg = tz.split('/')[0];
      ret = regionMap[reg];
      // If there's nothing listed in the main regions for this TZ, check the 'backward' links
      if (ret) return ret;
      var link = _this.zones[tz];
      if (typeof link === 'string') {
        return getRegionForTimezone(link);
      }
      // Backward-compat file hasn't loaded yet, try looking in there
      if (!_this.loadedZones.backward) {
        // This is for obvious legacy zones (e.g., Iceland) that don't even have a prefix like "America/" that look like normal zones
        _this.loadZoneFile('backward');
        return getRegionForTimezone(tz);
      }
      invalidTZError(tz);
    }