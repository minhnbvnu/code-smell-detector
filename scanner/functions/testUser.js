async function testUser (username, expectedRoles, scope) {
    const user = users[username]

    // test using user object rather than userId to avoid mocking
    for (const role of roles) {
      const expected = expectedRoles.includes(role)
      const msg = username + ' expected to have \'' + role + '\' permission but does not'
      const nmsg = username + ' had un-expected permission ' + role

      if (expected) {
        assert.isTrue(await Roles.userIsInRoleAsync(user, role, scope), msg)
      } else {
        assert.isFalse(await Roles.userIsInRoleAsync(user, role, scope), nmsg)
      }
    }
  }