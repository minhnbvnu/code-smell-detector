function parseDataToDateTime(parsed, parsedZone, opts, format, text) {
    var setZone = opts.setZone,
        zone = opts.zone;

    if (parsed && Object.keys(parsed).length !== 0) {
      var interpretationZone = parsedZone || zone,
          inst = DateTime.fromObject(Object.assign(parsed, opts, {
        zone: interpretationZone,
        // setZone is a valid option in the calling methods, but not in fromObject
        setZone: undefined
      }));
      return setZone ? inst : inst.setZone(zone);
    } else {
      return DateTime.invalid(new Invalid("unparsable", "the input \"" + text + "\" can't be parsed as " + format));
    }
  }