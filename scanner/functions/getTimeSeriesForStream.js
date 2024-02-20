function getTimeSeriesForStream(streamName, metadata, stream, target) {
  if (metadata.nograph) {
    return;
  }

  const mapper = metadata.valueMap;
  const scale = metadata.scale || 1;
  const getY = mapper ? d => mapper[d.variable] : d => d.variable * scale;
  const entry = stream.find(getTimeSeriesStreamEntry);
  const sampleDatum = getTimeSeriesStreamEntry(entry);
  if (!sampleDatum || !Number.isFinite(getY(sampleDatum))) {
    return;
  }

  target.isLoading = false;
  target.getX = getX;
  target.getY = getY;
  target.unit = metadata.unit || '';
  target.data[streamName] = stream.filter(getTimeSeriesStreamEntry).map(getTimeSeriesStreamEntry);
}