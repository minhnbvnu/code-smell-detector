function getSignatureReturns({yields, returns}, cssClass) {
  let returnTypes = [];

  if (yields || returns) {
    (yields || returns).forEach((r) => {
      if (r && r.type && r.type.names) {
        if (!returnTypes.length) {
          returnTypes = r.type.names;
        }
      }
    });
  }

  if (returnTypes && returnTypes.length) {
    returnTypes = returnTypes.map((r) => linkto(r, '', cssClass));
  }

  return returnTypes;
}