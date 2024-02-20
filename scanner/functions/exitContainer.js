async function exitContainer(container) {
  if (container) {
    // exitRs format: {"Error":null,"StatusCode":0}
    // see https://docs.docker.com/engine/api/v1.37/#operation/ContainerStop
    console.log('exitContainer...');
    await container.stop();

    containers.delete(container.id);
    console.log(green('container exited!'));
  } else {
    throw new Error(red('Exited container is undefined!'));
  }
}