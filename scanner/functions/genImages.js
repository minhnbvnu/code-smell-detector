async function genImages(zip) {
  const imageObjs = await Promise.all(Object.keys(skinSprites).map(fileName => getSpriteUrisFromFilename(zip, fileName))); // Merge all the objects into a single object. Tests assert that sprite keys are unique.

  return shallowMerge(imageObjs);
}