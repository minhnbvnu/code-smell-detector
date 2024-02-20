function getArch() {
  var arch = process.arch;
  if (arch === "ia32") arch = "x86";
  if (arch === "arm") arch = getArmArch();
  return arch;
}