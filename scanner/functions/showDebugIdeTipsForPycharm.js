async function showDebugIdeTipsForPycharm(codeSource, debugPort) {

  const stats = await fs.lstat(codeSource);

  if (!stats.isDirectory()) {
    codeSource = path.dirname(codeSource);
  }

  console.log(yellow(`\n========= Tips for PyCharm remote debug =========
Local host name: ${ip.address()}
Port           : ${yellow(debugPort)}
Path mappings  : ${yellow(codeSource)}=/code

Debug Code needed to copy to your function code:

import pydevd
pydevd.settrace('${ip.address()}', port=${debugPort}, stdoutToServer=True, stderrToServer=True)

=========================================================================\n`));
}