async function waitForExec(exec) {
  return await new Promise((resolve, reject) => {
    // stream.on('end') could not receive end event on windows.
    // so use inspect to check exec exit
    function waitContainerExec() {
      exec.inspect((err, data) => {
        if (data.Running) {
          setTimeout(waitContainerExec, 100);
          return;
        }
        if (err) {
          reject(err);
        } else if (data.ExitCode !== 0) {
          reject(`${data.ProcessConfig.entrypoint} exited with code ${data.ExitCode}`);
        } else {
          resolve(data.ExitCode);
        }
      });
    }
    waitContainerExec();
  });
}