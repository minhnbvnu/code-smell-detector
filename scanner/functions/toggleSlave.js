function toggleSlave() {
  mode.slave = !mode.slave;
  if (mode.slave) {
    openSlave();
  } else {
    closeSlave();
  }
}