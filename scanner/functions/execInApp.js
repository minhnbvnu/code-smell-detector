function execInApp(cmd, opts) {
  return sh.exec(`cd ${resolve(__dirname, "app")} && ${cmd}`, opts);
}