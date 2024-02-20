async function ensureCodeUriForJava(codeUri, serviceName, functionName) {

  if (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war')) {
    throw new Error(`
You can follow these steps:
    1. Modify ${serviceName}/${functionName}'s 'CodeUri' property to the directory where 'pom.xml' is located.
    2. Execute 'fun build' to build your functions.
    3. Execute 'fun deploy' to deploy resources.`);
  }
}