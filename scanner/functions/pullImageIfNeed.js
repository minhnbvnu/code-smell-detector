async function pullImageIfNeed(imageName) {
  const exist = await imageExist(imageName);

  if (!exist || !skipPullImage) {

    await pullImage(imageName);
  } else {
    debug(`skip pulling image ${imageName}...`);
    console.log(`skip pulling image ${imageName}...`);
  }
}