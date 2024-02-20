function disableDefaultResponseFor(type) {
  for (let [i, responder] of responders.entries()) {
    if (responder.type === type && responder.isDefault) {
      if (responder.actual > 0) {
        throw new Error(
          `Cannot remove default responder for ${type}: a response has already been sent!`
        );
      }

      responders.splice(i, 1);
      return;
    }
  }

  throw new Error(
    `Cannot remove default responder for ${type}: no such responder!`
  );
}