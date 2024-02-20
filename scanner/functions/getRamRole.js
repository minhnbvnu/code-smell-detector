async function getRamRole(ramClient, roleName) {
  try {
    return await ramClient.getRole({
      RoleName: roleName
    });
  } catch (ex) {
    debug('error when getRole: %s, error is: \n%O', roleName, ex);
    if (ex.name !== 'EntityNotExist.RoleError') {
      throw ex;
    }
  }
}