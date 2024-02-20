function showRosDeployNextTips(region) {

  const url = `https://ros.console.aliyun.com/#/stack/${region}`;

  console.log(green(`\nDeploy success, you can also login to ${url} to see more deploy logs.\n`));
}