function getTimeSeriesStreamEntry(stream) {
  return stream && Array.isArray(stream) ? stream.find(e => !e.object_id) : stream;
}