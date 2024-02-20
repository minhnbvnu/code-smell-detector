function run_container(opts = {}) {
    return h.docker.run(image,
      ["/bin/bash", "-c", "echo 'error' >&2; echo 'out';" ],
      _.merge({ stdout: mocks.stdout, stderr: mocks.stderr }, opts)
    );
  }