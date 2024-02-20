function buildBaseRoles() {
  const roles = {
    ADMIN: {
      id: 0n,
    },
    SOME_ADMIN: {
      id: 17n,
    },
    SOME_GUARDIAN: {
      id: 35n,
    },
    SOME: {
      id: 42n,
    },
    PUBLIC: {
      id: MAX_UINT64,
    },
  };

  // Names
  Object.entries(roles).forEach(([name, role]) => (role.name = name));

  // Defaults
  for (const role of Object.keys(roles)) {
    roles[role].admin = roles.ADMIN;
    roles[role].guardian = roles.ADMIN;
  }

  // Admins
  roles.SOME.admin = roles.SOME_ADMIN;

  // Guardians
  roles.SOME.guardian = roles.SOME_GUARDIAN;

  return roles;
}