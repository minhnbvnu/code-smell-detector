async function killProcessByFkill(processes) {
  for (const process of processes) {
    try {
      await fkill([process], { force: true, tree: true, ignoreCase: true });

      console.log(`Killed process: "${process}"`);
    } catch (_) {
      // eslint-disable-next-line no-empty
    }
  }
}