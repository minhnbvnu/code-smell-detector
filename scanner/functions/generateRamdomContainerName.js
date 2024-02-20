function generateRamdomContainerName() {
  return `fun_local_${new Date().getTime()}_${Math.random().toString(36).substr(2, 7)}`;
}