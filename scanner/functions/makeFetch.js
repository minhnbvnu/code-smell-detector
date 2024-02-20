function makeFetch(doc_id, requiredVariables = [], operationName = false) {
  return async function(variables = {}) {
    const body = {doc_id};
    if (operationName) body.operationName = operationName;
    // Validate required variables by presence
    if (requiredVariables.length > 0) {
      if (!variables) throw Error("No required variables provided for persisted fetch");
      const missing = [];
      for (let name of requiredVariables) {
        if (!variables.hasOwnProperty(name)) missing.push(name);
      }
      if (missing.length > 0) throw Error(`Missing required variables: ${missing.join(", ")}.`);
    }
    if (variables) body.variables = variables;
    const options = {
      method:"POST",
      body: JSON.stringify(body)
    };
    const response = await fetch(url, options)
      .then(res => res.json())
      .then(json => json);
    return response;
  };
}