function acpipowerbutton(name) {
  return exec('controlvm', name, 'acpipowerbutton');
}