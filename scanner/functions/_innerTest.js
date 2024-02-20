async function _innerTest (userParam, username, expectedRoles, scope) {
    // test that user has only the roles expected and no others
    for (const role of roles) {
      const expected = expectedRoles.includes(role)
      const msg = username + ' expected to have \'' + role + '\' role but does not'
      const nmsg = username + ' had the following un-expected role: ' + role

      if (expected) {
        assert.isTrue(await Roles.userIsInRoleAsync(userParam, role, scope), msg)
      } else {
        assert.isFalse(await Roles.userIsInRoleAsync(userParam, role, scope), nmsg)
      }
    }
  }