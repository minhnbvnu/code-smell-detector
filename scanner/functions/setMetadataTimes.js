function setMetadataTimes(metadata, start, end) {
  if (start || end) {
    if (start) {
      const logInfo = metadata.log_info || {};
      logInfo.start_time = start;
    }

    if (end) {
      const logInfo = metadata.log_info || {};
      logInfo.end_time = end;
    }
  }
}