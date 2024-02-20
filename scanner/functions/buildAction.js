function buildAction(action, block, root) {
  return () => describe(action.description, () => {
    ACTIONS[action.type] && ACTIONS[action.type]({action, root});

    describe('', () => {
      block && block();
    });
  });
}