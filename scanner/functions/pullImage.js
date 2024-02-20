async function pullImage(imageName) {

  const resolveImageName = await dockerOpts.resolveImageNameForPull(imageName);

  // copied from lib/edge/container.js
  const startTime = new Date();

  const stream = await docker.pull(resolveImageName);

  const visitor = await getVisitor();

  visitor.event({
    ec: 'image',
    ea: 'pull',
    el: 'start'
  }).send();

  const registry = await dockerOpts.resolveDockerRegistry();

  return await new Promise((resolve, reject) => {

    console.log(`begin pulling image ${resolveImageName}, you can also use ` + yellow(`'docker pull ${resolveImageName}'`) + ' to pull image by yourself.');

    const onFinished = async (err) => {

      containers.delete(stream);

      const pullDuration = parseInt((new Date() - startTime) / 1000);
      if (err) {
        visitor.event({
          ec: 'image',
          ea: 'pull',
          el: 'error'
        }).send();

        visitor.event({
          ec: 'image',
          ea: `pull from ${registry}`,
          el: 'error'
        }).send();

        visitor.event({
          ec: `image pull from ${registry}`,
          ea: `used ${pullDuration}`,
          el: 'error'
        }).send();
        reject(err);
        return;
      }

      visitor.event({
        ec: 'image',
        ea: `pull from ${registry}`,
        el: 'success'
      }).send();

      visitor.event({
        ec: 'image',
        ea: 'pull',
        el: 'success'
      }).send();

      visitor.event({
        ec: `image pull from ${registry}`,
        ea: `used ${pullDuration}`,
        el: 'success'
      }).send();

      for (const r of dockerOpts.DOCKER_REGISTRIES) {
        if (resolveImageName.indexOf(r) === 0) {
          const image = await docker.getImage(resolveImageName);

          const newImageName = resolveImageName.slice(r.length + 1);
          const repoTag = newImageName.split(':');

          // rename
          await image.tag({
            name: resolveImageName,
            repo: _.first(repoTag),
            tag: _.last(repoTag)
          });
          break;
        }
      }
      resolve(resolveImageName);
    };

    containers.add(stream);
    // pull image progress
    followProgress(stream, onFinished);
  });
}