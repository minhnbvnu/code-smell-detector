function checkCustomDomain(customDomainMetas, content, skipIfExists) {
  for (const customDomainMeta of customDomainMetas) {
    try {
      checkResource(customDomainMeta.customDomain, content);
      customDomainMeta.exists = false;
    } catch (error) {
      if (!skipIfExists) {
        throw error;
      }
      customDomainMeta.exists = true;
    }
  }
}