async function getColorspace(buffer) {
  const image = await sharp(buffer);
  const metadata = await image.metadata();

  return metadata.space;
}