function toTechTimeFormat(dt, _ref) {
    var _ref$suppressSeconds = _ref.suppressSeconds,
        suppressSeconds = _ref$suppressSeconds === void 0 ? false : _ref$suppressSeconds,
        _ref$suppressMillisec = _ref.suppressMilliseconds,
        suppressMilliseconds = _ref$suppressMillisec === void 0 ? false : _ref$suppressMillisec,
        includeOffset = _ref.includeOffset,
        _ref$includeZone = _ref.includeZone,
        includeZone = _ref$includeZone === void 0 ? false : _ref$includeZone,
        _ref$spaceZone = _ref.spaceZone,
        spaceZone = _ref$spaceZone === void 0 ? false : _ref$spaceZone,
        _ref$format = _ref.format,
        format = _ref$format === void 0 ? "extended" : _ref$format;
    var fmt = format === "basic" ? "HHmm" : "HH:mm";

    if (!suppressSeconds || dt.second !== 0 || dt.millisecond !== 0) {
      fmt += format === "basic" ? "ss" : ":ss";

      if (!suppressMilliseconds || dt.millisecond !== 0) {
        fmt += ".SSS";
      }
    }

    if ((includeZone || includeOffset) && spaceZone) {
      fmt += " ";
    }

    if (includeZone) {
      fmt += "z";
    } else if (includeOffset) {
      fmt += format === "basic" ? "ZZZ" : "ZZ";
    }

    return toTechFormat(dt, fmt);
  }