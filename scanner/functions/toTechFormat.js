function toTechFormat(dt, format, allowZ) {
    if (allowZ === void 0) {
      allowZ = true;
    }

    return dt.isValid ? Formatter.create(Locale.create("en-US"), {
      allowZ: allowZ,
      forceSimple: true
    }).formatDateTimeFromString(dt, format) : null;
  }