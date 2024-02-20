async function processKiller(ports, processesName) {
  if (ports && ports.length) {
    for (const port of ports) {
      if (port) {
        const portCast = `${port}`.startsWith(':') ? port : `:${port}`;

        await killProcessByFkill([portCast]);
        await killProcessByCmd([`${port}`.startsWith(':') ? `${port}`.substring(1) : port], 'port');
      }
    }
  }
  if (processesName && processesName.length) {
    await killProcess(getConfigProcessesName(processesName), 'name');
  }
}