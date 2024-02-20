function extractFcRole(role) {
  const [, , , , path] = role.split(':');
  const [, roleName] = path.split('/');
  return roleName;
}