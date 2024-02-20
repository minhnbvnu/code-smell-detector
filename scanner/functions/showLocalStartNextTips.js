function showLocalStartNextTips(customDomains) {

  const startCommand = customDomains.map(cur => `fun local start ${cur}`);
  const debugCommand = customDomains.map(cur => `fun local start -d 3000 ${cur}`);

  const startTip = `${startCommand.join('\n* ')}`;
  const debugTip = `${debugCommand.join('\n* ')}`;

  console.log(yellow(`\nTips：you can also use these commands to run/debug custom domain resources:\n
Start with customDomain: \n* ${startTip}

Debug with customDomain: \n* ${debugTip}\n`));
}