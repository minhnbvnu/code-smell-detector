function remoteInstance(name) {
  const instanceName = `remote_${name}`;
  if (instancePool[instanceName] === undefined) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo && userInfo.couchDB && userInfo.couchDB[name]) {
      const { username, password } = userInfo.couchDB;
      instancePool[instanceName] = new PouchDB(userInfo.couchDB[name], {
        skipSetup: true,
        auth: username && password ? { username, password } : undefined
      });
    }
  }

  return instancePool[instanceName];
}