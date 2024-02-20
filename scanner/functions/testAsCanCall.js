function testAsCanCall({
  closed,
  open: {
    callerIsTheManager,
    callerIsNotTheManager: { publicRoleIsRequired, specificRoleIsRequired },
  },
}) {
  testAsClosable({
    closed,
    open() {
      testAsRestrictedOperation({
        callerIsTheManager,
        callerIsNotTheManager() {
          testAsHasRole({
            publicRoleIsRequired,
            specificRoleIsRequired,
          });
        },
      });
    },
  });
}