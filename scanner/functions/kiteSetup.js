function kiteSetup(setup) {
  switch (setup) {
    case 'authenticated':
      return {reachable: true};
    case 'unsupported':
    case 'not_supported':
      return {supported: false};
    case 'uninstalled':
    case 'not_installed':
      return {installed: false};
    case 'not_running':
      return {running: false};
    case 'unreachable':
    case 'not_reachable':
      return {reachable: false};
    case 'unlogged':
    case 'not_logged':
      return {reachable: true};
    default:
      return {supported: false};
  }
}