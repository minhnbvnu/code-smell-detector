async function fromEPSGCode(code) {
  if (typeof code === 'string') {
    code = parseInt(code.split(':').pop(), 10);
  }

  const proj4 = registered;
  if (!proj4) {
    throw new Error('Proj4 must be registered first with register(proj4)');
  }

  const epsgCode = 'EPSG:' + code;
  if (proj4.defs(epsgCode)) {
    return get(epsgCode);
  }

  proj4.defs(epsgCode, await epsgLookup(code));
  register(proj4);

  return get(epsgCode);
}