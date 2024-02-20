function overrideProcess(cwd, chdir) {
  process.cwd = cwd;
  process.chdir = chdir;
}