function delegateSession(ctxTo, ctxFrom) {
  Object.keys(ctxFrom.session).forEach(key => {
    if (key === 'isNew') return;
    if (key[0] === '_') return;
    ctxTo.session[key] = ctxFrom.session[key];
  });
}