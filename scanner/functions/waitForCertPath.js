async function waitForCertPath(certPath) {
  let intervalId;
  return new Promise(resolve => {
    intervalId = setInterval(() => {
      if (!fs.existsSync(certPath)) return;
      clearInterval(intervalId);
      resolve();
    }, 500);
  });
}