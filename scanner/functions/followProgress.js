function followProgress(stream, onFinished) {

  const barLines = {};

  const onProgress = (event) => {
    let status = event.status;

    if (event.progress) {
      status = `${event.status} ${event.progress}`;
    }

    if (event.id) {
      const id = event.id;

      if (!barLines[id]) {
        barLines[id] = console.draft();
      }
      barLines[id](id + ': ' + status);
    } else {
      if (_.has(event, 'aux.ID')) {
        event.stream = event.aux.ID + '\n';
      }
      // If there is no id, the line should be wrapped manually.
      const out = event.status ? event.status + '\n' : event.stream;
      process.stdout.write(out);
    }
  };

  docker.modem.followProgress(stream, onFinished, onProgress);
}