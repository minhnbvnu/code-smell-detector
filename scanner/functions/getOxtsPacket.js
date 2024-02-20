function getOxtsPacket(oxtsLine) {
  const res = OxtsPacket.reduce((resMap, key, i) => {
    resMap[key] = oxtsLine[i];
    return resMap;
  }, {});

  return res;
}