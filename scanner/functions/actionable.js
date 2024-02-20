function actionable(actions) {
    let changed = false;
    Object.keys(actions).forEach((action) => {
      if (actionState[action] === undefined) throw new Error('Invalid action type');
      if (actionState[action] !== actions[action]) changed = true;
      actionState[action] = actions[action];
    });
    if (changed) ctx.map.fire(Constants.events.ACTIONABLE, { actions: actionState });
  }