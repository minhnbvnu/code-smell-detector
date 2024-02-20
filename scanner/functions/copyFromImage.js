async function copyFromImage(imageName, from, to) {
  const container = await docker.createContainer({
    Image: imageName
  });

  const archive = await container.getArchive({
    path: from
  });

  await zipTo(archive, to);

  await container.remove();
}