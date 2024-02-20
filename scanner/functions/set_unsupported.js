function set_unsupported(p) {
        loginData.unsupported[p] = true;
        debug ('Setting '+p+' to unsupported');
        setLogin(loginData);
      }