async function makePolicy(policyName, policyDocument) {
  const ram = await getRamClient();
  
  let exists = true;

  await promiseRetry(async (retry, times) => {
    try {
      try {
        await ram.getPolicy({
          PolicyType: 'Custom',
          PolicyName: policyName
        });
      } catch (ex) {
        if (ex.code !== 'EntityNotExist.Policy') {
          throw ex;
        } else { exists = false; }
      }
        
      if (!exists) {
        await ram.createPolicy({
          PolicyName: policyName,
          Description: 'generated by fc fun',
          PolicyDocument: JSON.stringify(policyDocument)
        });
      } else {
        // avoid limitExceeded.Policy.Version
        await deletePolicyNotDefaultVersion(ram, policyName);
      
        await ram.createPolicyVersion({
          PolicyName: policyName,
          PolicyDocument: JSON.stringify(policyDocument), 
          SetAsDefault: true
        });
      }
    } catch (ex) {
      if (ex.code && ex.code === 'NoPermission') {
        throw ex;
      }
      console.log(red(`retry ${times} times`));
      retry(ex);
    }
  });
}