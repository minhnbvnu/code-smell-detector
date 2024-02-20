async function killProcess(processesNameArr, type) {
  await killProcessByFkill(processesNameArr);
  await killProcessByCmd(processesNameArr, type);
}