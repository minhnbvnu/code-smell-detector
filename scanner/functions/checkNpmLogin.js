async function checkNpmLogin() {
  try {
    const npmUserName = await exec('npm whoami');

    return npmUserName.replace(/[\r\n]/g, '');
  } catch (e) {
    signale.error('请检查npm 登录状态');
  }
}