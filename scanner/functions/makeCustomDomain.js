async function makeCustomDomain({
  domainName,
  protocol,
  routeConfig,
  certConfig
}) {
  const fc = await getFcClient();
  var customDomain;
  await promiseRetry(async (retry, times) => {
    try {
      customDomain = await fc.getCustomDomain(domainName);
    } catch (ex) {
      if (ex.code !== 'DomainNameNotFound') {
        debug('error when getCustomDomain, domainName is %s, error is: \n%O', domainName, ex);

        console.log(red(`\tretry ${times} times`));
        retry(ex);
      }
    }
  });

  const options = {
    protocol
  };

  if (routeConfig) {
    Object.assign(options, {
      routeConfig
    });
  }

  if (!_.isEmpty(certConfig)) {
    let privateKey = certConfig.PrivateKey;
    let certificate = certConfig.Certificate;

    if (privateKey && privateKey.endsWith('.pem')) {
      certConfig.PrivateKey = await fs.readFile(privateKey, 'utf-8');
    }
    if (certificate && certificate.endsWith('.pem')) {
      certConfig.Certificate = await fs.readFile(certificate, 'utf-8');
    }
    Object.assign(options, {
      certConfig
    });
  }

  await promiseRetry(async (retry, times) => {
    try {
      if (!customDomain) {
        customDomain = await fc.createCustomDomain(domainName, options);
      } else {
        customDomain = await fc.updateCustomDomain(domainName, options);
      }
    } catch (ex) {
      debug('error when createCustomDomain or updateCustomDomain, domainName is %s, options is %j, error is: \n%O', domainName, options, ex);

      console.log(red(`\tretry ${times} times`));
      retry(ex);
    }
  });

  return customDomain;
}