function showInstallNextTips() {
  const eventInvokeTip = 'fun local invoke';
  const httpInvokeTip = 'fun local start';
  const deployTip = 'fun deploy';
  const buildTip = 'fun build';

  console.log(yellow(`\nTips for next step
======================
* Invoke Event Function: ${eventInvokeTip}
* Invoke Http Function: ${httpInvokeTip}
* Build Http Function: ${buildTip}
* Deploy Resources: ${deployTip}`));
}