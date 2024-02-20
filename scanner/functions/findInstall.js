function findInstall() {

  var INSTALL_DIR_1 = path.join('full phat', 'Snarl', 'tools');
  var INSTALL_DIR_2 = path.join('Snarl', 'tools');
  var PROGRAM_FILES = process.env.ProgramFiles || '';
  var PROGRAM_FILES_X86 = process.env['ProgramFiles(x86)'] || '';

  return findApp(cmd) ||
    findApp(path.join(PROGRAM_FILES, INSTALL_DIR_1, cmd)) ||
    findApp(path.join(PROGRAM_FILES_X86, INSTALL_DIR_1, cmd)) ||
    findApp(path.join(PROGRAM_FILES, INSTALL_DIR_2, cmd)) ||
    findApp(path.join(PROGRAM_FILES_X86, INSTALL_DIR_2, cmd));
}