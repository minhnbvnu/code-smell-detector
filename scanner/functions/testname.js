function testname(cmd, pattern) {
  if (cmd[0] === '--control')
    cmd = cmd.slice(2);
  cmd = cmd.join(' ');
  return fmt('cmd %j pattern %s', cmd, new RegExp(pattern));
}