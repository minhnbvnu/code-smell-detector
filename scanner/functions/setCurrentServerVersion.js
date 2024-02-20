function setCurrentServerVersion(val) {
        loginData.currentServerVersion = val;
        setLogin(loginData);
        debug("Setting server version to:" + val);
      }