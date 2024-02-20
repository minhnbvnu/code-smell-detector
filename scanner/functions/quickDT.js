function quickDT(obj, zone) {
    // assume we have the higher-order units
    for (var _iterator = _createForOfIteratorHelperLoose(orderedUnits$1), _step; !(_step = _iterator()).done;) {
      var u = _step.value;

      if (isUndefined(obj[u])) {
        obj[u] = defaultUnitValues[u];
      }
    }

    var invalid = hasInvalidGregorianData(obj) || hasInvalidTimeData(obj);

    if (invalid) {
      return DateTime.invalid(invalid);
    }

    var tsNow = Settings.now(),
        offsetProvis = zone.offset(tsNow),
        _objToTS = objToTS(obj, offsetProvis, zone),
        ts = _objToTS[0],
        o = _objToTS[1];

    return new DateTime({
      ts: ts,
      zone: zone,
      o: o
    });
  }