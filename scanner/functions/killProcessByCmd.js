async function killProcessByCmd(processes, type) {
  if (processes && processes.length) {
    for (const processSingle of processes) {
      const results = await findProcess(type, processSingle, true);

      if (results && results.length) {
        for (const result of results) {
          try {
            if (process.platform === 'win32' && !result.name.includes('node')) {
              await command(`taskkill /F /IM ${result.name} /T`);

              console.log(`Killed process: "${processSingle}" system name is "${result.name}"`);
            } else if (!process.name.includes('node')) {
              await command(`pkill -f ${result.name}`);

              console.log(`Killed process: "${processSingle}" system name is "${result.name}"`);
            }
          } catch (_) {
            // eslint-disable-next-line no-empty
          }
        }
      }
    }
  }
}