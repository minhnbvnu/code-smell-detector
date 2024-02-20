async function genRegion(zip) {
  const region = await getFileFromZip(zip, "REGION", "txt", "text");
  return region ? regionParser(region.contents) : {};
}