function getTimestamps(info) {
  const logStartTime = Number.isFinite(info.log_start_time) ? info.log_start_time : null;
  const logEndTime = Number.isFinite(info.log_end_time) ? info.log_end_time : null;
  // Fallback to complete log time if we don't have a specific playback time range
  const eventStartTime = Number.isFinite(info.start_time) ? info.start_time : logStartTime;
  const eventEndTime = Number.isFinite(info.end_time) ? info.end_time : logEndTime;

  return {logStartTime, logEndTime, eventStartTime, eventEndTime};
}