function getJpegMarkers() {
  // Tables/misc header markers.
  // DQT, DHT, DAC, DRI, COM, APP_n
  const tableMarkers = new Set([0xffdb, 0xffc4, 0xffcc, 0xffdd, 0xfffe]);
  for (let i = 0xffe0; i < 0xfff0; ++i) {
    tableMarkers.add(i);
  }

  // SOF markers and DHP marker.
  // These markers are after tables/misc data.
  const sofMarkers = new Set([
    0xffc0,
    0xffc1,
    0xffc2,
    0xffc3,
    0xffc5,
    0xffc6,
    0xffc7,
    0xffc9,
    0xffca,
    0xffcb,
    0xffcd,
    0xffce,
    0xffcf,
    0xffde
  ]);

  return {tableMarkers, sofMarkers};
}