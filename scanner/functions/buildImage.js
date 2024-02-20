function buildImage(dockerBuildDir, dockerfilePath, imageTag) {

  return new Promise((resolve, reject) => {
    var tarStream = tar.pack(dockerBuildDir);

    docker.buildImage(tarStream, {
      dockerfile: path.relative(dockerBuildDir, dockerfilePath),
      t: imageTag
    }, (error, stream) => {
      containers.add(stream);

      if (error) {
        reject(error);
        return;
      }
      stream.on('error', (e) => {
        containers.delete(stream);
        reject(e);
        return;
      });
      stream.on('end', function () {
        containers.delete(stream);
        resolve(imageTag);
        return;
      });

      followProgress(stream, (err, res) => err ? reject(err) : resolve(res));
    });
  });
}